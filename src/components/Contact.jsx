import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// --- EXTERNAL UI COMPONENTS ---
const ServiceToggle = ({ method, setMethod }) => (
  <div className="flex gap-4 mb-2 bg-tertiary p-2 rounded-xl w-fit">
    <button
      type="button"
      onClick={() => setMethod("emailjs")}
      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${method === "emailjs" ? "bg-purple-600 text-white shadow-lg" : "text-secondary hover:text-white"
        }`}
    >
      EmailJS
    </button>
    <button
      type="button"
      onClick={() => setMethod("formsubmit")}
      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${method === "formsubmit" ? "bg-green-600 text-white shadow-lg" : "text-secondary hover:text-white"
        }`}
    >
      FormSubmit.co
    </button>
  </div>
);

const InputField = ({ label, name, type = "text", placeholder, value, onChange }) => (
  <motion.label
    className="flex flex-col gap-2"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <span className="text-white font-medium text-sm ml-1">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-purple-500 transition-all font-medium"
      required
    />
  </motion.label>
);

const Contact = () => {
  const formRef = useRef();

  // --- STATE ---
  const [submissionMethod, setSubmissionMethod] = useState("emailjs");
  const [loading, setLoading] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Initialize Queue from Local Storage
  const [failedQueue, setFailedQueue] = useState(() => {
    const saved = localStorage.getItem("failed_requests");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    title: "", name: "", intro: "", phone: "", email: "", message: "",
  });

  // --- PERSISTENCE LOGIC ---
  useEffect(() => {
    localStorage.setItem("failed_requests", JSON.stringify(failedQueue));
  }, [failedQueue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // --- SYSTEM FINGERPRINTING (MAC Address Proxy) ---
  const getSystemInfo = () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenRes: `${window.screen.width}x${window.screen.height}`,
      timestamp: new Date().toISOString(),
      // Note: Real MAC Address is inaccessible in browsers for security
    };
  };

  // --- QUEUE MANAGEMENT ---
  const addToFailedQueue = (data) => {
    const newEntry = {
      ...data,
      id: Date.now(),
      systemInfo: getSystemInfo() // Storing hidden metadata
    };

    setFailedQueue((prev) => {
      const updated = [newEntry, ...prev].slice(0, 10); // Keep last 10
      return updated;
    });
    setShowFallback(true);
  };

  const removeFromQueue = (id) => {
    setFailedQueue((prev) => prev.filter(item => item.id !== id));
  };

  // --- ACTION HANDLERS ---

  // 1. Manual Mailto Fallback
  const handleMailto = (data) => {
    const subject = encodeURIComponent(`Portfolio Query: ${data.title} - ${data.name}`);
    const body = encodeURIComponent(
      `Hi Rupesh,

(System Info: ${data.systemInfo?.platform || 'Unknown'})

--------------------------------
👤 Name: ${data.name}
💼 Title: ${data.title}
📞 Phone: ${data.phone}
📧 Email: ${data.email}
📝 Intro: ${data.intro}
--------------------------------

Message:
${data.message}`
    );
    window.location.href = `mailto:krishnaleena222@gmail.com?subject=${subject}&body=${body}`;
  };

  // 2. Retry via API
  const handleRetryApi = async (data) => {
    setLoading(true);
    // Use the component's main submit logic logic, but with passed data
    await executeSubmission(data, true);
    setLoading(false);
  };

  // --- CORE SUBMISSION LOGIC ---
  const executeSubmission = async (data, isRetry = false) => {
    // 1. Create "Hidden" JSON Object before Attempt
    const hiddenPayload = {
      _meta: { type: "contact_form", version: "1.0" },
      ...data,
      system_details: getSystemInfo()
    };

    console.log("🚀 Prepared Payload:", hiddenPayload); // Hidden log for debugging

    try {
      if (submissionMethod === "emailjs") {
        console.log("DEBUG KEYS:", {
          service: import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          template: import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          key: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY // This is likely 'undefined'
        });
        await emailjs.send(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          {
            title: data.title,
            name: data.name,
            intro: data.intro,
            phone: data.phone,
            email: data.email,
            message: data.message,
            time: new Date().toLocaleString(),
          },
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        );
      } else {
        const response = await fetch(
          `https://formsubmit.co/ajax/${import.meta.env.VITE_APP_FORMSUBMIT_EMAIL}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
              _subject: `New Query: ${data.title}`,
              ...data,
              _template: "table"
            }),
          }
        );
        if (!response.ok) throw new Error("FormSubmit failed");
      }

      alert("Message Sent Successfully!");

      if (isRetry && data.id) {
        removeFromQueue(data.id); // Remove from queue if retry works
      } else {
        setForm({ title: "", name: "", intro: "", phone: "", email: "", message: "" });
      }

    } catch (error) {
      console.error("Submission Failed:", error);
      if (!isRetry) addToFailedQueue(data); // Only add to queue if it's a fresh fail
      else alert("Retry failed again. Please use the Email button.");

      if (!showFallback) setShowFallback(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await executeSubmission(form);
    setLoading(false);
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden relative min-w-[320px]`}>

      {/* --- FALLBACK / HISTORY MODAL --- */}
      <AnimatePresence>
        {showFallback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <div className="bg-[#1d1836] p-6 rounded-2xl border border-white/10 max-w-2xl w-full shadow-2xl flex flex-col max-h-[85vh]">

              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  💾 Pending Requests ({failedQueue.length})
                </h3>
                <button onClick={() => setShowFallback(false)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                {failedQueue.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No pending failed requests.</p>
                ) : (
                  failedQueue.map((item, idx) => (
                    <div key={item.id || idx} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white font-bold">{item.title}</p>
                          <p className="text-xs text-gray-400">{new Date(item.id).toLocaleString()}</p>
                        </div>
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Failed</span>
                      </div>
                      <p className="text-sm text-gray-300 truncate mb-4">{item.message}</p>

                      {/* DUAL ACTION BUTTONS */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRetryApi(item)}
                          disabled={loading}
                          className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-sm py-2 rounded-lg font-medium transition-colors"
                        >
                          {loading ? "Retrying..." : "🔄 Retry Server"}
                        </button>
                        <button
                          onClick={() => handleMailto(item)}
                          className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm py-2 rounded-lg font-medium transition-colors"
                        >
                          📧 Open Mail App
                        </button>
                        <button
                          onClick={() => removeFromQueue(item.id)}
                          className="px-3 text-gray-500 hover:text-red-400"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN FORM --- */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className={styles.sectionSubText}>Get in touch</p>
            <h3 className={styles.sectionHeadText}>Contact.</h3>
          </div>

          {/* HISTORY BUTTON */}
          <button
            onClick={() => setShowFallback(true)}
            className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full"
          >
            <span>📂</span> Pending: {failedQueue.length}
          </button>
        </div>

        <div className="mt-2">
          <span className="text-secondary text-xs mb-2 block">Select Service Provider:</span>
          <ServiceToggle method={submissionMethod} setMethod={setSubmissionMethod} />
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Title/Role" name="title" placeholder="e.g. Recruiter" value={form.title} onChange={handleChange} />
            <InputField label="Full Name" name="name" placeholder="What's your name?" value={form.name} onChange={handleChange} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Short Intro" name="intro" placeholder="One liner about you" value={form.intro} onChange={handleChange} />
            <InputField label="Phone Number" name="phone" type="tel" placeholder="+91 000..." value={form.phone} onChange={handleChange} />
          </div>
          <InputField label="Email Address" name="email" type="email" placeholder="email@address.com" value={form.email} onChange={handleChange} />
          <motion.label className="flex flex-col gap-2">
            <span className="text-white font-medium text-sm ml-1">Your Message</span>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your feedback..."
              className="bg-tertiary py-3 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent focus:border-green-500 transition-all font-medium resize-none"
              required
            />
          </motion.label>
          <button type="submit" disabled={loading} className={`py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-md shadow-primary transition-all duration-300 transform active:scale-95 ${loading ? "bg-gray-600" : "bg-white text-tertiary hover:bg-purple-500 hover:text-white"}`}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");