import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  FaEnvelope,
  FaMobileAlt,
  FaWhatsapp,
  FaGithub,
  FaLinkedin,
  FaGlobe
} from "react-icons/fa";
import { SiUpwork } from "react-icons/si";

const MyDetailsComponent = ({ data }) => {
  // Use data passed from props (or fallback to your JSON import)
  const { name, email, phone, socialLinks, homepage } = data;

  // 1. Generate vCard Content dynamically
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${name}
EMAIL:${email}
TEL;TYPE=WORK,VOICE:${phone}
URL:${homepage}
END:VCARD`;

  // 2. Helper to download vCard
  const downloadVCard = () => {
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name.replace(" ", "_")}_Contact.vcf`;
    link.click();
  };

  return (
    <div className="p-6 bg-tertiary rounded-2xl max-w-4xl w-full mx-auto shadow-xl border border-white/10">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-between">

        {/* LEFT SIDE: Contact Info */}
        <div className="flex-1 space-y-6 w-full">
          <h2 className="text-3xl font-bold text-white mb-4">
            Let's Connect <span className="text-[#915eff]">!</span>
          </h2>

          {/* Direct Contact */}
          <div className="space-y-4 text-secondary text-lg">
            <div className="flex items-center gap-4 hover:text-white transition-colors">
              <div className="p-3 bg-white/5 rounded-full"><FaEnvelope size={20} /></div>
              <a href={`mailto:${email}`}>{email}</a>
            </div>

            <div className="flex items-center gap-4 hover:text-white transition-colors">
              <div className="p-3 bg-white/5 rounded-full"><FaMobileAlt size={20} /></div>
              <a href={`tel:${phone}`}>{phone}</a>
            </div>

            <div className="flex items-center gap-4 hover:text-white transition-colors">
              <div className="p-3 bg-white/5 rounded-full"><FaWhatsapp size={20} /></div>
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`} // Strips symbols for API
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="flex flex-wrap gap-3 mt-6">
            {Object.values(socialLinks).map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-black-200 rounded-lg border border-white/5 hover:bg-white/10 hover:border-[#915eff] transition-all"
              >
                {/* Simple icon mapping based on title */}
                {link.title.toLowerCase().includes("github") && <FaGithub />}
                {link.title.toLowerCase().includes("linkedin") && <FaLinkedin />}
                {link.title.toLowerCase().includes("upwork") && <SiUpwork />}
                {!["github", "linkedin", "upwork"].some(k => link.title.toLowerCase().includes(k)) && <FaGlobe />}
                <span className="text-sm font-medium">{link.title}</span>
              </a>
            ))}
          </div>

          {/* Download Button */}
          <button
            onClick={downloadVCard}
            className="w-full mt-4 py-3 bg-gradient-to-r from-[#915eff] to-[#5e3eff] rounded-xl font-bold text-white shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95"
          >
            📥 Save Contact to Phone
          </button>
        </div>

        {/* RIGHT SIDE: QR Code */}
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-2xl">
          <QRCodeCanvas
            size={200}
            value={vCardData}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"} // High error correction
            includeMargin={true}
          />
          <p className="text-black text-xs font-bold mt-2 uppercase tracking-wider">Scan to Add Contact</p>
        </div>

      </div>
    </div>
  );
};
export const aboutData = {
  name: "B. Rupesh",
  email: "krishnaleena222@gmail.com",
  phone: "+91-7075608796", // Fixed typo from &07 to 707
  homepage: "https://rupesh-klr.github.io/", // ✅ Your Homepage
  socialLinks: {
    github: {
      url: "https://github.com/Rupesh-klr/",
      title: "GitHub",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/rupeshb6/",
      title: "LinkedIn",
    },
    upwork: {
      url: "https://www.upwork.com/freelancers/~01ddf5e4e0e5cbcec1",
      title: "Upwork",
    },
    portfolio: {
      url: "https://rupesh-klr.github.io/",
      title: "Portfolio",
    }
  },
};
export default MyDetailsComponent;