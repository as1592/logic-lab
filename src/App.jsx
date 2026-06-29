import { useState, useCallback, useEffect } from "react";

// ─── MOBILE HOOK ──────────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// ─── SLIDE LINKS ─────────────────────────────────────────────────────────────
const SLIDE_LINKS = {
  "cyber_1_1": "https://docs.google.com/presentation/d/1eNm-lAfWiC_H5rmRTCixSwGFV6iax-Cdx-2bBalPZYo/edit",
  "cyber_1_2": "https://docs.google.com/presentation/d/1kMvfUOWL1p-MZ5wjd4vo6DONxtYm2geL7MdcjNAaY8g/edit",
  "cyber_1_3": "https://docs.google.com/presentation/d/1GwhpoQmiKnsWGGo3qHQAKQ4wbqcqyRcUN3WlUvY6mXU/edit",
  "cyber_1_4": "https://docs.google.com/presentation/d/1_p5l5NehOUVVKoPXXmqbypGqNt2MIXK4avpyZpOEALY/edit",
  "cyber_1_5": "https://docs.google.com/presentation/d/1YAistZcGGiNai4dgu8yGS9GO1GWufO_bnojbCkwGpfA/edit",
};

// ─── CURRICULUM DATA ──────────────────────────────────────────────────────────
const COURSES = {
  csp: {
    id: "csp", title: "AP® Computer Science Principles", shortTitle: "AP® CS Principles",
    description: "Big ideas in computing: algorithms, data, networks, and impact",
    icon: "⚙️", color: "#6C63FF", accentLight: "#EEF2FF",
    heroActivities: true,
    units: [
      {
        id: "csp_bi1", title: "Big Idea 1: Creative Development", color: "#8B5CF6", icon: "🎨",
        description: "CRD · 13–18% of exam", apCode: "CRD",
        bigIdeaDesc: "Students design and iteratively develop programs, working collaboratively to bring creative ideas to life.",
        lessons: [
          { id: "csp_bi1_1", codeOrg: "U9", title: "Create Performance Task Checklist", type: "activity", unlocked: true, description: "A step-by-step checklist that guides students through every CPT requirement — lists, procedures, parameters, iteration, and selection.", driveUrl: "https://docs.google.com/document/d/1FS_ZMcv8Y8x5CDhUaHCbG46P2gGH1qddyRrsH4LPOdk/edit" },
          { id: "csp_bi1_2", codeOrg: "U9", title: "CPT Graphic Organizer", type: "activity", unlocked: true, description: "A planning scaffold that helps students map out their program's purpose, list, procedure, and written responses before they start coding.", driveUrl: "https://drive.google.com/file/d/1R56PDry9rDr9dIvv8RXOov0PbBKjCq8s/view" },
          { id: "csp_bi1_3", codeOrg: "U9", title: "Procedures Practice", type: "activity", unlocked: true, description: "Students analyze real code segments to identify CPT-required elements — parameters, iteration, selection — and explain what each procedure does.", driveUrl: "https://docs.google.com/document/d/1sgBL_BIZWYJe9gMG6uXhuI95FIPLLyCIeu8k1qabDl4/edit" },
          { id: "csp_bi1_4", codeOrg: "U9", title: "Sample Create Performance Tasks", type: "activity", unlocked: true, description: "Three annotated sample programs with lists and procedures that meet CPT requirements — useful as mentor texts before students write their own.", driveUrl: "https://drive.google.com/file/d/1hohVQYSJd9nWvgBhfgADZGCTRGjStLy4/view" },
          { id: "csp_bi1_5", codeOrg: "U4L6", title: "Boolean Logic Game", type: "game", unlocked: true, description: "Click shapes that match AND, OR, NOT, and XOR expressions. 8 progressive levels.", game: "boolean", levels: 8 },
        ],
      },
      {
        id: "csp_bi2", title: "Big Idea 2: Data", color: "#F59E0B", icon: "📊",
        description: "DAT · 17–22% of exam", apCode: "DAT",
        bigIdeaDesc: "Students explore how data is collected, represented, transformed, and used to generate new knowledge and solve problems.",
        lessons: [
          { id: "csp_bi2_1", codeOrg: "U1L7", title: "Digital vs. Analog Card Sort", type: "activity", subtype: "manipulative", unlocked: true, description: "Students sort 20 everyday objects — vinyl records, smartphones, sundials — into analog or digital categories to build intuition about data representation.", driveUrl: "https://drive.google.com/file/d/1bpJ_FzQD_G3GjZkCA-bS95a0-6Tqub3D/view" },
          { id: "csp_bi2_2", codeOrg: "U1L7", title: "Analog vs. Digital Data Sort", type: "activity", subtype: "manipulative", unlocked: true, description: "A worksheet where students categorize data types and describe how sampling converts analog signals into digital form.", driveUrl: "https://drive.google.com/file/d/1P71QLDfMsxx2ryxCxlHqbC_XeefAPvxV/view" },
          { id: "csp_bi2_3", codeOrg: "U1L7", title: "Analog to Digital Bell Ringer", type: "activity", unlocked: true, description: "A warm-up that asks students to explain in their own words how a camera and a microphone each convert real-world analog signals into digital data using sampling.", driveUrl: "https://drive.google.com/file/d/1K71G6vA01iQjeqYQwWYsJ3eB5lbmiX8U/view" },
          { id: "csp_bi2_4", codeOrg: "U1L8", title: "Hex/Binary Color Code Card Sort", type: "activity", subtype: "manipulative", unlocked: true, description: "Students match hex and binary RGB color codes to their corresponding colors, reinforcing binary representation of digital images.", driveUrl: "https://drive.google.com/file/d/11lz9RYhlhGLPRl8qsuft9sNYf3chII_c/view" },
          { id: "csp_bi2_5", codeOrg: "U1L9–10", title: "Lossy vs. Lossless Compression Venn Diagram", type: "activity", subtype: "manipulative", unlocked: true, description: "A statement sort where students classify characteristics of lossy and lossless compression and explain the tradeoffs between file size and quality.", driveUrl: "https://drive.google.com/file/d/1DH4Nm28jxIbeG3bnG5e5dnZlEPpovFSY/view" },
          { id: "csp_bi2_6", codeOrg: "U1L5", title: "Overflow & Roundoff Error Venn Diagram", type: "activity", subtype: "manipulative", unlocked: true, description: "Students sort statements about overflow and roundoff errors into a Venn diagram, distinguishing the two types of data representation limitations.", driveUrl: "https://drive.google.com/file/d/1-ntxAw6uZQEDdwj3cbbX60fWVrFQiWDt/view" },
        ],
      },
      {
        id: "csp_bi3", title: "Big Idea 3: Algorithms & Programming", color: "#6C63FF", icon: "⚙️",
        description: "AAP · 30–35% of exam", apCode: "AAP",
        bigIdeaDesc: "Students use algorithms and abstractions to develop programs that solve problems or express creativity.",
        lessons: [
          { id: "csp_bi3_1", codeOrg: "U4L6", title: "Boolean Logic Game", type: "game", unlocked: true, description: "Click shapes that match AND, OR, NOT, and XOR expressions. 8 progressive levels aligned to AAP-2.H.", game: "boolean", levels: 8 },
        ],
      },
      {
        id: "csp_bi4", title: "Big Idea 4: Computer Systems & Networks", color: "#10B981", icon: "🌐",
        description: "CSN · 11–15% of exam", apCode: "CSN",
        bigIdeaDesc: "Students explore how computer systems and networks operate, how the internet works, and how parallel computing improves performance.",
        lessons: [
          { id: "csp_bi4_1", codeOrg: "U2L5", title: "Internet Fill-in-the-Blank Bell Ringer", type: "activity", unlocked: true, description: "A warm-up where students use a word bank to complete sentences about open protocols, bandwidth, fault tolerance, and scalability.", driveUrl: "https://drive.google.com/file/d/13_IOOyKR9xKoD-NeZGPTW3vA1Tm_Asbr/view" },
          { id: "csp_bi4_2", codeOrg: "U2L6", title: "Internet Graphic Organizer", type: "activity", unlocked: true, description: "Students complete a visual organizer explaining how packets travel along redundant paths and how TCP/IP manages reliable data delivery.", driveUrl: "https://drive.google.com/file/d/1WoUBF4jFzG3H4rliDhd9kKZm6tfin-NS/view" },
          { id: "csp_bi4_3", codeOrg: "U2L5", title: "Packet Transmission Graphic Organizer", type: "activity", unlocked: true, description: "Students trace how a photo is broken into packets, given metadata headers, routed to a destination, and reassembled at the other end.", driveUrl: "https://drive.google.com/file/d/1-aNcecWW0fTR2NDqgokt1bezDes9EzKI/view" },
          { id: "csp_bi4_4", codeOrg: "U2L6", title: "Layers of the Internet Foldable", type: "activity", subtype: "manipulative", unlocked: true, description: "A printable foldable covering all five layers of the internet stack — Physical, IP, TCP/UDP, DNS, and HTTP — with fill-in-the-blank prompts and an answer key.", driveUrl: "https://drive.google.com/file/d/1pQewYrVMfDDFXH6t_Zp_IOlPakV5xdeJ/view" },
          { id: "csp_bi4_5", codeOrg: "U2L5", title: "IP, TCP & UDP Protocols Foldable", type: "activity", subtype: "manipulative", unlocked: true, description: "A foldable graphic organizer where students define each protocol and compare their roles in packet transmission across the internet.", driveUrl: "https://drive.google.com/file/d/1ko9FuU7VVPhpf3QTyO-OviyrTxiQyDkn/view" },
          { id: "csp_bi4_6", codeOrg: "U2L5", title: "UDP vs. TCP Venn Diagram Sort", type: "activity", subtype: "manipulative", unlocked: true, description: "Students sort statements about UDP and TCP into a Venn diagram, distinguishing speed vs. reliability tradeoffs in packet transmission.", driveUrl: "https://drive.google.com/file/d/18GXCW4wevfQ-IhEuCOJjB9dh1Dp5QPuo/view" },
          { id: "csp_bi4_7", codeOrg: "U8L3/L5", title: "Strava App Class Discussion", type: "activity", unlocked: true, description: "A discussion activity based on the NYT video about how Strava's fitness heatmap accidentally revealed military bases — exploring data, privacy, and computing impact.", driveUrl: "https://drive.google.com/file/d/1VpiGLfwWN8cKecLPsObkKnZ7C1R5KTTc/view" },
        ],
      },
      {
        id: "csp_bi5", title: "Big Idea 5: Impact of Computing", color: "#EF4444", icon: "🌍",
        description: "IOC · 21–26% of exam", apCode: "IOC",
        bigIdeaDesc: "Students examine the effects computing has had on society, economy, and culture, and explore legal and ethical responsibilities.",
        lessons: [
          { id: "csp_bi5_1", codeOrg: "Unit 8", title: "AI Ethics Sorting Scenarios", type: "activity", subtype: "manipulative", unlocked: true, description: "Students place AI-use scenarios on an ethical spectrum from 'very unethical' to 'highly beneficial,' then discuss what makes each case acceptable or problematic.", driveUrl: "https://drive.google.com/file/d/1CVKXAEcL6GNIjdSkEFdwgVixe1YZ-qVo/view" },
          { id: "csp_bi5_2", codeOrg: "Before U1L1", title: "AI Syllabus Card Sort (Back-to-School)", type: "activity", subtype: "manipulative", unlocked: true, description: "Students sort AI-use scenarios — debugging with AI, copying AI code, using AI to study — into ethical, grey area, and unethical categories using class policy.", driveUrl: "https://drive.google.com/file/d/1YDTy6xdfAiRpFt0wHPdAohPv7U6N9dlG/view" },
          { id: "csp_bi5_3", codeOrg: "U2L7", title: "Digital Divide Foldable", type: "activity", subtype: "manipulative", unlocked: true, description: "A foldable that defines the digital divide and its three root causes — economic barriers, lack of education, geographic barriers — with real-world solutions for each.", driveUrl: "https://drive.google.com/file/d/1kj2tm0nX9X7_Kg8M7G5XX6NRYXy9739I/view" },
          { id: "csp_bi5_4", codeOrg: "U1L11", title: "Creative Commons vs. Copyright Infographic", type: "activity", unlocked: true, description: "Students create an infographic comparing traditional copyright and Creative Commons licensing, with real examples of artists and organizations who use each.", driveUrl: "https://docs.google.com/document/d/1oS4JMk_FdlvYM8eXEbjpW2ku6BMRTO7d6aG5zq3WIR4/edit" },
        ],
      },
    ],
  },
  cyber: {
    id: "cyber", title: "AP® Cybersecurity", shortTitle: "AP® Cyber",
    description: "Defend systems, understand threats, and explore digital safety",
    icon: "🛡️", color: "#0EA5E9", accentLight: "#E0F2FE",
    units: [
      {
        id: "cyber_u1", title: "Unit 1: Introduction to Security", color: "#0EA5E9", icon: "🔑",
        description: "~10 class periods",
        lessons: [
          {
            id: "cyber_1_1", title: "1.1 Understanding Social Engineering", apConcept: "1.1.A · 1.1.B · 1.1.C",
            description: "Identify social engineering tactics and explain how they manipulate victims.",
            type: "lesson", unlocked: true, slideKey: "cyber_1_1",
            objectives: [
              { code: "1.1.A", text: "Identify common indicators of social engineering tactics." },
              { code: "1.1.B", text: "Explain how social engineering tactics influence victims to perform a desired action." },
              { code: "1.1.C", text: "Describe possible impacts for victims of social engineering attacks." },
            ],
            agenda: [
              { type: "LAUNCH", detail: '"It Was Easy to Hack a Billionaire"', time: "8–10 min", objectives: "1.1.B, 1.1.C" },
              { type: "DIRECT", detail: "What Is Social Engineering?", time: "10–12 min", objectives: "1.1.A, 1.1.B" },
              { type: "APPLY", detail: "Case Studies & Identifying Tactics", time: "8–10 min", objectives: "1.1.A, 1.1.B" },
              { type: "ACTIVITY", detail: "Interactive Phishing Quiz", time: "5–7 min", objectives: "1.1.A" },
              { type: "ACTIVITY", detail: "Quizlet Live", time: "7–10 min", objectives: "1.1.A, 1.1.B, 1.1.C" },
              { type: "ASSESS", detail: "Check for Understanding (5 MC)", time: "5–7 min", objectives: "1.1.A, 1.1.B, 1.1.C" },
            ],
            vocab: [
              { term: "Social Engineering", def: "A cyberattack that uses psychological tactics to manipulate people into revealing sensitive information or performing an action." },
              { term: "Pretexting", def: "A tactic in which an adversary creates a believable false story or identity to trick a victim." },
              { term: "Phishing", def: "Social engineering conducted via email to steal credentials or deliver malicious links/files." },
              { term: "Smishing", def: "Social engineering conducted via text message (SMS)." },
              { term: "Vishing", def: "Social engineering conducted via phone or voice communication." },
              { term: "Urgency", def: "Pressuring a target to act quickly so they skip verification steps." },
              { term: "Intimidation", def: "Threatening negative consequences to coerce a target into complying." },
              { term: "Impersonation", def: "Pretending to be a trusted person or organization to influence behavior." },
              { term: "Elicitation", def: "Gathering sensitive information through seemingly casual conversation." },
            ],
            duration: "1 class period",
          },
          {
            id: "cyber_1_2", title: "1.2 Suspicious Website Logins", apConcept: "1.2.A · 1.2.B · 1.2.C",
            description: "Identify password attacks and explain how to strengthen authentication.",
            type: "lesson", unlocked: true, slideKey: "cyber_1_2",
            objectives: [
              { code: "1.2.A", text: "Identify common signs of a password attack." },
              { code: "1.2.B", text: "Explain how adversaries take advantage of weak authentication." },
              { code: "1.2.C", text: "Explain how to make authentication stronger." },
            ],
            agenda: [
              { type: "LAUNCH", detail: "Have You Ever Seen This?", time: "3–5 min", objectives: "1.2.A" },
              { type: "LAUNCH", detail: 'Darknet Diaries – "The Beirut Bank Job"', time: "8–10 min", objectives: "1.2.B" },
              { type: "DIRECT", detail: "Password Attacks", time: "10–12 min", objectives: "1.2.A, 1.2.B" },
              { type: "ACTIVITY", detail: "Have I Been Pwned?", time: "5–7 min", objectives: "1.2.A" },
              { type: "ACTIVITY", detail: "Password Attack Simulation", time: "8–10 min", objectives: "1.2.B, 1.2.C" },
              { type: "ASSESS", detail: "Check for Understanding", time: "5–7 min", objectives: "1.2.A, 1.2.B, 1.2.C" },
            ],
            vocab: [
              { term: "Brute Force Attack", def: "Repeatedly guessing many possible passwords until one works." },
              { term: "Credential Stuffing", def: "Using usernames and passwords stolen from one site to try on many others." },
              { term: "Password Spraying", def: "Trying a few common passwords against many accounts to avoid lockouts." },
              { term: "Dictionary Attack", def: "Using lists of common words and patterns to guess passwords." },
              { term: "Multi-Factor Authentication (MFA)", def: "Requiring a second form of verification beyond a password." },
              { term: "Password Manager", def: "A tool that securely stores and generates strong, unique passwords." },
            ],
            duration: "1–2 class periods",
          },
          {
            id: "cyber_1_3", title: "1.3 Best Practices for Public Networks", apConcept: "1.3.A · 1.3.B · 1.3.C",
            description: "Identify adversary types and wireless attack methods, and describe protective actions.",
            type: "lesson", unlocked: true, slideKey: "cyber_1_3",
            objectives: [
              { code: "1.3.A", text: "Identify the type of adversary conducting a cyberattack." },
              { code: "1.3.B", text: "Identify types of wireless cyberattacks." },
              { code: "1.3.C", text: "Describe actions individuals can take to increase protection of sensitive data when using the internet and Wi-Fi." },
            ],
            agenda: [
              { type: "LAUNCH", detail: "DHS Investigating Massive Internet Attack", time: "5–7 min", objectives: "1.3.A" },
              { type: "DIRECT", detail: "Types of Adversaries", time: "10–12 min", objectives: "1.3.A" },
              { type: "ACTIVITY", detail: "Adversary Card Sort", time: "8–10 min", objectives: "1.3.A" },
              { type: "DIRECT", detail: "Wireless Attack Types", time: "8–10 min", objectives: "1.3.B, 1.3.C" },
              { type: "ACTIVITY", detail: "Jigsaw Reading", time: "10–12 min", objectives: "1.3.B, 1.3.C" },
              { type: "ASSESS", detail: "Check for Understanding", time: "5–7 min", objectives: "1.3.A, 1.3.B, 1.3.C" },
            ],
            vocab: [
              { term: "Nation-State Actor", def: "Highly skilled groups supported by governments that conduct espionage and sabotage." },
              { term: "Organized Crime Group", def: "Criminal organizations motivated by profit through ransomware, data theft, and phishing." },
              { term: "Hacktivist", def: "An attacker motivated by political or social causes." },
              { term: "Insider Threat", def: "A trusted individual who misuses their access intentionally or accidentally." },
              { term: "Script Kiddie", def: "A low-skilled attacker who uses tools created by others." },
              { term: "Evil Twin Attack", def: "Creating a fake wireless access point that mimics a legitimate network." },
              { term: "War Driving", def: "Driving around detecting and recording wireless network beacons." },
              { term: "Jamming Attack", def: "Transmitting electromagnetic signals that prevent wireless devices from communicating." },
            ],
            duration: "2 class periods",
          },
          {
            id: "cyber_1_4", title: "1.4 AI-Based Cybersecurity Attacks", apConcept: "1.4.A · 1.4.B",
            description: "Explain how adversaries use AI to augment attacks and how to defend against them.",
            type: "lesson", unlocked: true, slideKey: "cyber_1_4",
            objectives: [
              { code: "1.4.A", text: "Explain how adversaries use AI-powered tools to augment cyberattacks." },
              { code: "1.4.B", text: "Explain how to protect against some AI-augmented cyberattacks." },
            ],
            agenda: [
              { type: "LAUNCH", detail: '"Deepfake CFO" – Hong Kong Fraud Case', time: "5–7 min", objectives: "1.4.A" },
              { type: "DIRECT", detail: "How AI Augments Cyberattacks", time: "10–12 min", objectives: "1.4.A" },
              { type: "APPLY", detail: "Voice Cloning & AI Phishing", time: "5–7 min", objectives: "1.4.A" },
              { type: "APPLY", detail: "Real vs. AI-Generated Message", time: "5–7 min", objectives: "1.4.A" },
              { type: "DIRECT", detail: "Defending Against AI Attacks", time: "8–10 min", objectives: "1.4.B" },
              { type: "ACTIVITY", detail: "Defense Strategy Matching", time: "7–10 min", objectives: "1.4.B" },
              { type: "ASSESS", detail: "Check for Understanding (5 MC)", time: "5–7 min", objectives: "1.4.A, 1.4.B" },
            ],
            vocab: [
              { term: "AI Voice Cloning", def: "Using AI to create a synthetic voice replica that can impersonate a real person in real time." },
              { term: "Deepfake", def: "AI-generated synthetic video or audio that realistically mimics a real person." },
              { term: "AI-Generated Phishing", def: "Phishing messages written by generative AI — grammatically correct and highly personalized." },
              { term: "AI Reconnaissance", def: "Automated gathering of personal data from public sources to craft targeted attacks." },
              { term: "Prompt Injection", def: "Manipulating AI systems by inserting malicious instructions into inputs." },
              { term: "Training Data Poisoning", def: "Corrupting AI training data to cause incorrect or harmful model behavior." },
            ],
            duration: "1–2 class periods",
          },
          {
            id: "cyber_1_5", title: "1.5 Leveraging AI in Cyber Defense", apConcept: "1.5.A · 1.5.B",
            description: "Explain how defenders use AI tools to protect networks and detect threats faster.",
            type: "lesson", unlocked: true, slideKey: "cyber_1_5",
            objectives: [
              { code: "1.5.A", text: "Explain how cyber defenders can leverage AI-powered tools to protect networks, applications, and data." },
              { code: "1.5.B", text: "Explain how AI-powered tools are enabling faster and more accurate threat detection and response." },
            ],
            agenda: [
              { type: "LAUNCH", detail: "AI Outsmarts Hackers – Real-World Defense Stories", time: "5–7 min", objectives: "1.5.A" },
              { type: "DIRECT", detail: "How AI Defends Networks & Apps", time: "10–12 min", objectives: "1.5.A" },
              { type: "APPLY", detail: "Human Review Still Matters", time: "5–7 min", objectives: "1.5.A" },
              { type: "DIRECT", detail: "AI-Powered Threat Detection", time: "8–10 min", objectives: "1.5.B" },
              { type: "ACTIVITY", detail: "Identify the AI Defense Tool", time: "7–10 min", objectives: "1.5.A, 1.5.B" },
              { type: "ASSESS", detail: "Check for Understanding", time: "5–7 min", objectives: "1.5.A, 1.5.B" },
            ],
            vocab: [
              { term: "SIEM", def: "Security Information and Event Management — a system that collects and analyzes security logs to detect threats." },
              { term: "Anomaly Detection", def: "AI identifying behavior that deviates from a normal baseline, indicating a potential attack." },
              { term: "Threat Intelligence", def: "Data about current and emerging cyber threats used to improve defenses." },
              { term: "Security Configuration Review", def: "AI scanning firewall rules and access controls to flag risky settings." },
              { term: "Automated Response", def: "AI-driven systems that take action against threats faster than human analysts." },
            ],
            duration: "1–2 class periods",
          },
        ],
      },
      {
        id: "cyber_u2", title: "Unit 2: Securing Spaces", color: "#8B5CF6", icon: "🏢",
        description: "~21 class periods",
        lessons: [
          { id: "cyber_2_1", title: "2.1 Cyber Foundations", apConcept: "Unit 2", description: "Physical security and access controls", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_2_2", title: "2.2 Physical Vulnerabilities & Attacks", apConcept: "Unit 2", description: "Identify physical attack vectors", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_2_3", title: "2.3 Protecting Physical Spaces", apConcept: "Unit 2", description: "Implement physical security controls", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_2_4", title: "2.4 Detecting Physical Attacks", apConcept: "Unit 2", description: "Monitor and detect physical security incidents", type: "lesson", unlocked: false, comingSoon: true },
        ],
      },
      {
        id: "cyber_u3", title: "Unit 3: Securing Networks", color: "#10B981", icon: "🌐",
        description: "~26 class periods",
        lessons: [
          { id: "cyber_3_1", title: "3.1 Network Vulnerabilities & Attacks", apConcept: "Unit 3", description: "Identify common network attack types", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_3_2", title: "3.2 Protecting Networks: Managerial Controls", apConcept: "Unit 3", description: "Apply policies and procedures to secure networks", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_3_3", title: "3.3 Protecting Networks: Segmentation", apConcept: "Unit 3", description: "Use network segmentation to limit attack surfaces", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_3_4", title: "3.4 Protecting Networks: Firewalls", apConcept: "Unit 3", description: "Configure firewalls to filter network traffic", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_3_5", title: "3.5 Detecting Network Attacks", apConcept: "Unit 3", description: "Monitor networks and detect intrusions", type: "lesson", unlocked: false, comingSoon: true },
        ],
      },
      {
        id: "cyber_u4", title: "Unit 4: Securing Devices", color: "#F59E0B", icon: "💻",
        description: "~23 class periods",
        lessons: [
          { id: "cyber_4_1", title: "4.1 Device Vulnerabilities & Attacks", apConcept: "Unit 4", description: "Identify common device attack vectors", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_4_2", title: "4.2 Authentication & Wireless Security", apConcept: "Unit 4", description: "Implement strong authentication methods", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_4_3", title: "4.3 Protecting Devices", apConcept: "Unit 4", description: "Apply device hardening techniques", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_4_4", title: "4.4 Detecting Attacks on Devices", apConcept: "Unit 4", description: "Monitor and respond to device-level threats", type: "lesson", unlocked: false, comingSoon: true },
        ],
      },
      {
        id: "cyber_u5", title: "Unit 5: Securing Applications & Data", color: "#EF4444", icon: "🔐",
        description: "~30 class periods",
        lessons: [
          { id: "cyber_5_1", title: "5.1 Application & Data Vulnerabilities", apConcept: "Unit 5", description: "Identify software and data attack types", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_5_2", title: "5.2 Protecting Applications & Data", apConcept: "Unit 5", description: "Apply access controls and secure coding", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_5_3", title: "5.3 Protecting Stored Data with Cryptography", apConcept: "Unit 5", description: "Use encryption to protect data at rest", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_5_4", title: "5.4 Asymmetric Cryptography", apConcept: "Unit 5", description: "Understand public/private key encryption", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_5_5", title: "5.5 Protecting Applications", apConcept: "Unit 5", description: "Secure web and mobile applications", type: "lesson", unlocked: false, comingSoon: true },
          { id: "cyber_5_6", title: "5.6 Detecting Attacks on Data & Applications", apConcept: "Unit 5", description: "Identify and respond to application-level attacks", type: "lesson", unlocked: false, comingSoon: true },
        ],
      },
    ],
  },
};

// ─── AGENDA TYPE COLORS ───────────────────────────────────────────────────────
const AGENDA_COLORS = {
  LAUNCH:   { bg: "#FEF3C7", color: "#92400E", label: "LAUNCH" },
  DIRECT:   { bg: "#EEF2FF", color: "#3730A3", label: "DIRECT INSTRUCTION" },
  APPLY:    { bg: "#DCFCE7", color: "#166534", label: "APPLY" },
  ACTIVITY: { bg: "#F3E8FF", color: "#6B21A8", label: "ACTIVITY" },
  ASSESS:   { bg: "#FEE2E2", color: "#991B1B", label: "ASSESSMENT" },
};

// ─── BOOLEAN GAME ENGINE ──────────────────────────────────────────────────────
const SHAPES = ["circle", "square", "triangle", "star"];
const COLORS_LIST = ["red", "blue", "green", "yellow", "purple"];
const SIZES = ["small", "large"];

function generateShapes(count = 12) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    color: COLORS_LIST[Math.floor(Math.random() * COLORS_LIST.length)],
    size: SIZES[Math.floor(Math.random() * SIZES.length)],
  }));
}

function evaluateExpression(expr, shape) {
  if (expr.type === "atom") {
    if (expr.attr === "color") return shape.color === expr.value;
    if (expr.attr === "shape") return shape.shape === expr.value;
    if (expr.attr === "size") return shape.size === expr.value;
  }
  if (expr.type === "NOT") return !evaluateExpression(expr.operand, shape);
  if (expr.type === "AND") return evaluateExpression(expr.left, shape) && evaluateExpression(expr.right, shape);
  if (expr.type === "OR") return evaluateExpression(expr.left, shape) || evaluateExpression(expr.right, shape);
  if (expr.type === "XOR") return evaluateExpression(expr.left, shape) !== evaluateExpression(expr.right, shape);
  return false;
}

function exprToString(expr) {
  if (expr.type === "atom") return `${expr.attr} = "${expr.value}"`;
  if (expr.type === "NOT") return `NOT (${exprToString(expr.operand)})`;
  if (expr.type === "AND") return `(${exprToString(expr.left)}) AND (${exprToString(expr.right)})`;
  if (expr.type === "OR") return `(${exprToString(expr.left)}) OR (${exprToString(expr.right)})`;
  if (expr.type === "XOR") return `(${exprToString(expr.left)}) XOR (${exprToString(expr.right)})`;
}

function atom(attr, value) { return { type: "atom", attr, value }; }
function AND(left, right) { return { type: "AND", left, right }; }
function OR(left, right) { return { type: "OR", left, right }; }
function NOT(operand) { return { type: "NOT", operand }; }
function XOR(left, right) { return { type: "XOR", left, right }; }

function randomAtom(allowSize = false) {
  const attrs = allowSize ? ["color", "shape", "size"] : ["color", "shape"];
  const attr = attrs[Math.floor(Math.random() * attrs.length)];
  const pool = attr === "color" ? COLORS_LIST : attr === "shape" ? SHAPES : SIZES;
  return atom(attr, pool[Math.floor(Math.random() * pool.length)]);
}

function generateExpression(level) {
  if (level <= 2) return randomAtom();
  if (level === 3) return AND(randomAtom(), randomAtom());
  if (level === 4) return OR(randomAtom(), randomAtom());
  if (level === 5) return NOT(randomAtom());
  if (level === 6) return AND(OR(randomAtom(), randomAtom()), randomAtom(true));
  if (level === 7) return OR(NOT(randomAtom()), randomAtom(true));
  return XOR(AND(randomAtom(), randomAtom(true)), NOT(randomAtom()));
}

function generateBooleanLevel(level) {
  let shapes, expr, answers, attempts = 0;
  do {
    shapes = generateShapes(12);
    expr = generateExpression(level);
    answers = shapes.filter(s => evaluateExpression(expr, s)).map(s => s.id);
    attempts++;
  } while ((answers.length === 0 || answers.length === 12) && attempts < 20);
  return { shapes, expr, answers };
}

// ─── SHAPE RENDERER ───────────────────────────────────────────────────────────
const COLOR_MAP = { red: "#EF4444", blue: "#3B82F6", green: "#22C55E", yellow: "#EAB308", purple: "#A855F7" };

function ShapeIcon({ shape, color, size, selected, correct, revealed, onClick }) {
  const px = size === "small" ? 28 : 40;
  const c = COLOR_MAP[color] || color;
  const border = revealed
    ? correct ? "3px solid #22C55E" : selected ? "3px solid #EF4444" : "3px solid transparent"
    : selected ? "3px solid #6C63FF" : "3px solid transparent";
  const svgShape = () => {
    if (shape === "circle") return <circle cx="24" cy="24" r={px / 2} fill={c} />;
    if (shape === "square") return <rect x={24 - px / 2} y={24 - px / 2} width={px} height={px} fill={c} rx="3" />;
    if (shape === "triangle") return <polygon points={`24,${24 - px / 2} ${24 - px / 2},${24 + px / 2} ${24 + px / 2},${24 + px / 2}`} fill={c} />;
    if (shape === "star") {
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? px / 2 : px / 4;
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        pts.push(`${24 + r * Math.cos(angle)},${24 + r * Math.sin(angle)}`);
      }
      return <polygon points={pts.join(" ")} fill={c} />;
    }
  };
  return (
    <div onClick={onClick} style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: 10, border, background: selected && !revealed ? "#EEF2FF" : "#F8FAFC", transition: "all 0.15s", transform: selected && !revealed ? "scale(1.06)" : "scale(1)" }}>
      <svg width="48" height="48" viewBox="0 0 48 48">{svgShape()}</svg>
    </div>
  );
}

// ─── BOOLEAN GAME ─────────────────────────────────────────────────────────────
function BooleanGame({ onBack, progress, setProgress }) {
  const isMobile = useIsMobile();
  const levelKey = "csp_u1l1";
  const startLevel = (progress[levelKey] || 0) + 1;
  const [level, setLevel] = useState(Math.min(startLevel, 8));
  const [gameData, setGameData] = useState(null);
  const [selected, setSelected] = useState(new Set());
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [complete, setComplete] = useState(false);

  const loadLevel = useCallback((lvl) => {
    setGameData(generateBooleanLevel(lvl));
    setSelected(new Set()); setRevealed(false); setFeedback(null);
  }, []);

  useEffect(() => { loadLevel(level); }, [level, loadLevel]);

  const toggle = (id) => {
    if (revealed) return;
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const check = () => {
    if (!gameData) return;
    const correct = new Set(gameData.answers);
    const isRight = [...selected].every(id => correct.has(id)) && [...correct].every(id => selected.has(id));
    setRevealed(true);
    if (isRight) {
      const pts = 100 + streak * 25;
      setScore(s => s + pts); setStreak(s => s + 1);
      setFeedback({ ok: true, msg: streak >= 2 ? `🔥 ${streak + 1}× streak! +${pts}pts` : `✓ Correct! +${pts}pts` });
    } else {
      setStreak(0);
      const missed = gameData.answers.filter(id => !selected.has(id)).length;
      const extra = [...selected].filter(id => !correct.has(id)).length;
      setFeedback({ ok: false, msg: `✗ ${missed} missed, ${extra} extra. Check the highlighted shapes.` });
    }
  };

  const next = () => {
    if (level >= 8) { setComplete(true); setProgress(prev => ({ ...prev, [levelKey]: 8 })); }
    else { const nl = level + 1; setLevel(nl); setProgress(prev => ({ ...prev, [levelKey]: nl - 1 })); }
  };

  if (complete) return (
    <div style={{ textAlign: "center", padding: 48 }}>
      <div style={{ fontSize: 64 }}>🎉</div>
      <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 28, color: "#1E1B4B", marginBottom: 8 }}>Boolean Logic Mastered!</h2>
      <p style={{ color: "#6B7280", marginBottom: 32 }}>Final score: <strong>{score} pts</strong></p>
      <button onClick={onBack} style={btnStyle("#6C63FF")}>← Back to Course Map</button>
    </div>
  );

  const levelLabels = ["", "Single Attribute", "Single Attribute", "AND", "OR", "NOT", "AND + OR", "NOT + OR", "XOR + Nested"];
  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#6B7280" }}>←</button>
        <div>
          <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 18, color: "#1E1B4B" }}>Boolean Logic</div>
          <div style={{ fontSize: 12, color: "#9CA3AF" }}>AAP-2.H · Level {level} of 8 · {levelLabels[level]}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
          {streak >= 2 && <div style={{ background: "#FEF3C7", color: "#D97706", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>🔥 {streak}×</div>}
          <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, color: "#6C63FF", fontSize: 18 }}>{score} pts</div>
        </div>
      </div>
      <div style={{ height: 4, background: "#E5E7EB", borderRadius: 4, marginBottom: 24 }}>
        <div style={{ height: 4, background: "#6C63FF", borderRadius: 4, width: `${((level - 1) / 8) * 100}%`, transition: "width 0.4s" }} />
      </div>
      {gameData && (
        <div style={{ background: "#F5F3FF", border: "2px solid #C4B5FD", borderRadius: 14, padding: "18px 22px", marginBottom: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#7C3AED", marginBottom: 6, textTransform: "uppercase" }}>Select all shapes where:</div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: isMobile ? 14 : 17, color: "#1E1B4B", lineHeight: 1.6, wordBreak: "break-word" }}>{exprToString(gameData.expr)}</div>
          <div style={{ marginTop: 10, fontSize: 12, color: "#9CA3AF" }}>{gameData.answers.length} shape{gameData.answers.length !== 1 ? "s" : ""} match · click all of them, then check</div>
        </div>
      )}
      {gameData && (
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(6, 1fr)", gap: 8, marginBottom: 20 }}>
          {gameData.shapes.map(s => <ShapeIcon key={s.id} {...s} selected={selected.has(s.id)} correct={gameData.answers.includes(s.id)} revealed={revealed} onClick={() => toggle(s.id)} />)}
        </div>
      )}
      {feedback && <div style={{ padding: "12px 16px", borderRadius: 10, marginBottom: 16, fontSize: 14, background: feedback.ok ? "#DCFCE7" : "#FEE2E2", color: feedback.ok ? "#166534" : "#991B1B", fontWeight: 500 }}>{feedback.msg}</div>}
      <div style={{ display: "flex", gap: 10 }}>
        {!revealed ? (
          <><button onClick={check} disabled={selected.size === 0} style={btnStyle("#6C63FF", selected.size === 0)}>Check Answer</button>
          <button onClick={() => loadLevel(level)} style={btnStyle("#E5E7EB", false, "#374151")}>New Shapes</button></>
        ) : <button onClick={next} style={btnStyle("#6C63FF")}>{level >= 8 ? "Finish 🎉" : "Next Level →"}</button>}
      </div>
      <div style={{ marginTop: 28, padding: "14px 18px", background: "#F9FAFB", borderRadius: 10, border: "1px solid #E5E7EB" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Quick Reference</div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "6px 20px", fontSize: 13, color: "#374151" }}>
          <div><code style={codeStyle}>A AND B</code> — both must be true</div>
          <div><code style={codeStyle}>A OR B</code> — either can be true</div>
          <div><code style={codeStyle}>NOT A</code> — A must be false</div>
          <div><code style={codeStyle}>A XOR B</code> — exactly one true</div>
        </div>
      </div>
    </div>
  );
}

// ─── LESSON DETAIL PAGE ───────────────────────────────────────────────────────
function LessonPage({ lesson, unit, onBack, allLessons }) {
  const isMobile = useIsMobile();
  const [vocabOpen, setVocabOpen] = useState(false);
  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];
  const slideUrl = lesson.slideKey ? SLIDE_LINKS[lesson.slideKey] : null;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: isMobile ? "16px 12px 40px" : "24px 16px 48px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 14, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>
        ← {unit.title}
      </button>
      <div style={{ background: `linear-gradient(135deg, ${unit.color}15, ${unit.color}05)`, border: `2px solid ${unit.color}33`, borderRadius: 16, padding: "24px 28px", marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: unit.color, textTransform: "uppercase", marginBottom: 6, fontFamily: "'Inter', sans-serif" }}>
          AP® Cybersecurity · {lesson.apConcept}
        </div>
        <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 26, color: "#1E1B4B", marginBottom: 8 }}>{lesson.title}</div>
        <div style={{ fontFamily: "'Inter', sans-serif", color: "#6B7280", fontSize: 15, marginBottom: 20 }}>{lesson.description}</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {slideUrl && (
            <a href={slideUrl} target="_blank" rel="noopener noreferrer" style={{ background: unit.color, color: "#fff", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
              📊 View Slides →
            </a>
          )}
          <div style={{ fontSize: 13, color: "#9CA3AF" }}>⏱ {lesson.duration}</div>
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={sectionHeader}>Learning Objectives</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {lesson.objectives?.map(obj => (
            <div key={obj.code} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#F8FAFC", borderRadius: 10, padding: "12px 16px", border: "1px solid #E5E7EB" }}>
              <div style={{ background: unit.color, color: "#fff", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", marginTop: 1 }}>{obj.code}</div>
              <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{obj.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <div style={sectionHeader}>Lesson Agenda</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {lesson.agenda?.map((item, i) => {
            const ag = AGENDA_COLORS[item.type] || AGENDA_COLORS.ACTIVITY;
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "130px 1fr auto", gap: isMobile ? 6 : 12, alignItems: isMobile ? "flex-start" : "center", background: "#fff", borderRadius: 10, padding: "12px 16px", border: "1px solid #E5E7EB" }}>
                <div style={{ background: ag.bg, color: ag.color, borderRadius: 6, padding: "3px 8px", fontSize: 10, fontWeight: 700, textAlign: "center", alignSelf: "flex-start" }}>{ag.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1E1B4B" }}>
                  {item.detail}
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2, fontWeight: 400 }}>Objectives: {item.objectives}</div>
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" }}>{item.time}</div>
              </div>
            );
          })}
        </div>
      </div>

      {lesson.vocab && lesson.vocab.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <button onClick={() => setVocabOpen(v => !v)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: 10, padding: "14px 16px", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            <div style={sectionHeader}>Key Vocabulary ({lesson.vocab.length} terms)</div>
            <div style={{ color: "#9CA3AF", fontSize: 18 }}>{vocabOpen ? "▲" : "▼"}</div>
          </button>
          {vocabOpen && (
            <div style={{ border: "1px solid #E5E7EB", borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
              {lesson.vocab.map((v, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "180px 1fr", gap: isMobile ? 4 : 16, padding: "12px 16px", borderTop: i > 0 ? "1px solid #F3F4F6" : "none", background: "#fff" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#1E1B4B" }}>{v.term}</div>
                  <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{v.def}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 8 }}>
        {prevLesson && !prevLesson.comingSoon ? (
          <button onClick={() => onBack(prevLesson)} style={{ ...btnStyle("#F3F4F6", false, "#374151"), fontSize: 13 }}>← {prevLesson.title}</button>
        ) : <div />}
        {nextLesson && !nextLesson.comingSoon ? (
          <button onClick={() => onBack(nextLesson)} style={{ ...btnStyle(unit.color), fontSize: 13 }}>{nextLesson.title} →</button>
        ) : <div />}
      </div>
    </div>
  );
}

// ─── COURSE MAP ───────────────────────────────────────────────────────────────
function CourseMap({ course, onSelectLesson, onBack, progress }) {
  const isMobile = useIsMobile();
  const [openUnits, setOpenUnits] = useState({ [course.units[0]?.id]: true });
  const toggleUnit = (id) => setOpenUnits(prev => ({ ...prev, [id]: !prev[id] }));
  const isCSP = course.heroActivities;

  return (
    <div>
      {isCSP ? (
        <div style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #4C1D95 100%)", padding: isMobile ? "24px 12px 20px" : "40px 24px 36px" }}>
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#A5B4FC", fontSize: 14, fontFamily: "'Inter', sans-serif", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>← All Courses</button>
            <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, color: "#fff", marginBottom: 6 }}>{course.title}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", color: "#A5B4FC", fontSize: 15, marginBottom: 20 }}>Foldables, card sorts, graphic organizers, and interactive games — organized by the 5 AP® Big Ideas.</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
              {["📄 Foldables", "🃏 Card Sorts", "🗂️ Graphic Organizers", "🎮 Games", "✅ CPT Resources"].map(b => (
                <div key={b} style={{ background: "#ffffff18", border: "1px solid #ffffff22", borderRadius: 20, padding: "5px 14px", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#E0E7FF" }}>{b}</div>
              ))}
            </div>
            <div style={{ background: "#ffffff12", border: "1px solid #ffffff20", borderRadius: 10, padding: "10px 16px", display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#C7D2FE", lineHeight: 1.6 }}>
                These materials can supplement <strong style={{ color: "#fff" }}>any AP® CS Principles curriculum</strong>. Where applicable, each activity includes a <strong style={{ color: "#fff" }}>Code.org alignment label</strong> showing which unit and lesson it pairs with — so you can drop it right into your existing pacing guide.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 16px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 28 }}>
            <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#6B7280", marginTop: 4 }}>←</button>
            <div>
              <div style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 26, fontWeight: 800, color: "#1E1B4B", lineHeight: 1.1 }}>{course.title}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", color: "#6B7280", fontSize: 14, marginTop: 4 }}>{course.description}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 820, margin: "0 auto", padding: isCSP ? (isMobile ? "16px 12px" : "28px 16px") : (isMobile ? "0 12px 20px" : "0 16px 28px") }}>
        {course.units.map(unit => (
          <div key={unit.id} style={{ marginBottom: 16, border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden" }}>
            <div onClick={() => toggleUnit(unit.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", background: openUnits[unit.id] ? `${unit.color}08` : "#fff", cursor: "pointer", borderBottom: openUnits[unit.id] ? "1px solid #E5E7EB" : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${unit.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{unit.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 16, color: "#1E1B4B", textAlign: "left" }}>{unit.title}</div>
                {unit.description && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9CA3AF", marginTop: 2, textAlign: "left" }}>{unit.description} · {unit.lessons.length} {isCSP ? "resources" : "lessons"}</div>}
              </div>
              <div style={{ color: unit.color, fontWeight: 700, fontSize: 18 }}>{openUnits[unit.id] ? "▲" : "▼"}</div>
            </div>

            {openUnits[unit.id] && isCSP && unit.bigIdeaDesc && (
              <div style={{ padding: "12px 20px", background: `${unit.color}06`, borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{unit.bigIdeaDesc}</div>
              </div>
            )}

            {openUnits[unit.id] && (
              <div style={{ background: "#fff" }}>
                {isCSP ? (
                  <div>
                    {unit.lessons.map((lesson, i) => {
                      const isGame = lesson.type === "game";
                      const lvlDone = progress[lesson.id] || 0;
                      const pct = lesson.levels ? Math.round((lvlDone / lesson.levels) * 100) : 0;
                      const badgeBg = isGame ? unit.color : lesson.subtype === "manipulative" ? "#F59E0B" : "#E5E7EB";
                      const badgeColor = isGame || lesson.subtype === "manipulative" ? "#fff" : "#6B7280";
                      const badgeLabel = isGame ? "GAME" : lesson.subtype === "manipulative" ? "MANIPULATIVE" : "ACTIVITY";
                      const iconBg = isGame ? `${unit.color}20` : lesson.subtype === "manipulative" ? "#FEF3C7" : "#EFF6FF";
                      const icon = isGame ? "🎮" : lesson.subtype === "manipulative" ? "📋" : "📝";
                      return (
                        <div key={lesson.id}
                          onClick={() => isGame ? onSelectLesson(lesson, unit) : lesson.driveUrl && window.open(lesson.driveUrl, "_blank")}
                          style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderTop: i > 0 ? "1px solid #F3F4F6" : "none", cursor: "pointer", transition: "background 0.1s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#F8FAFC"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
                        >
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{icon}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 600, fontSize: 14, color: "#1E1B4B", marginBottom: 2 }}>{lesson.title}</div>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9CA3AF" }}>{lesson.description}</div>
                            {isGame && lesson.levels && (
                              <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ flex: 1, height: 3, background: "#F3F4F6", borderRadius: 4 }}>
                                  <div style={{ height: 3, width: `${pct}%`, background: unit.color, borderRadius: 4 }} />
                                </div>
                                <div style={{ fontSize: 11, color: "#9CA3AF" }}>{lvlDone}/{lesson.levels}</div>
                              </div>
                            )}
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                            <div style={{ fontSize: 10, background: badgeBg, color: badgeColor, borderRadius: 6, padding: "3px 8px", fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: 0.3 }}>
                              {badgeLabel}
                            </div>
                            {lesson.codeOrg && (
                              <div style={{ fontSize: 9, background: "#EFF6FF", color: "#1D4ED8", borderRadius: 5, padding: "2px 6px", fontFamily: "'Inter', sans-serif", fontWeight: 600, whiteSpace: "nowrap" }}>
                                Code.org {lesson.codeOrg}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  unit.lessons.map((lesson, i) => {
                    const canOpen = lesson.unlocked && !lesson.comingSoon;
                    const lvlDone = progress[lesson.id] || 0;
                    const pct = lesson.levels ? Math.round((lvlDone / lesson.levels) * 100) : 0;
                    return (
                      <div key={lesson.id} onClick={() => canOpen && onSelectLesson(lesson, unit)}
                        style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderTop: i > 0 ? "1px solid #F3F4F6" : "none", cursor: canOpen ? "pointer" : "default", opacity: lesson.comingSoon ? 0.5 : 1, transition: "background 0.1s" }}
                        onMouseEnter={e => { if (canOpen) e.currentTarget.style.background = "#F8FAFC"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
                      >
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: canOpen ? `${unit.color}18` : "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                          {lesson.comingSoon ? "🔒" : lesson.type === "game" ? "🎮" : "📄"}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 600, fontSize: 14, color: "#1E1B4B", marginBottom: 2, textAlign: "left" }}>{lesson.title}</div>
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9CA3AF", textAlign: "left" }}>{lesson.description}</div>
                          {canOpen && lesson.levels && (
                            <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ flex: 1, height: 3, background: "#F3F4F6", borderRadius: 4 }}>
                                <div style={{ height: 3, width: `${pct}%`, background: unit.color, borderRadius: 4 }} />
                              </div>
                              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{lvlDone}/{lesson.levels}</div>
                            </div>
                          )}
                        </div>
                        {lesson.comingSoon
                          ? <span style={{ fontSize: 11, background: "#F3F4F6", color: "#9CA3AF", padding: "2px 8px", borderRadius: 8, flexShrink: 0 }}>Soon</span>
                          : canOpen ? <div style={{ color: "#D1D5DB", fontSize: 18 }}>›</div> : null}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ onSelect }) {
  const isMobile = useIsMobile();
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #1E3A5F 100%)", padding: isMobile ? "36px 16px 32px" : "60px 24px 56px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 48, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: isMobile ? 26 : 36, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
              Ready-to-teach AP® CS resources — built to excite students and give you your planning time back.
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#A5B4FC", lineHeight: 1.7, marginBottom: 28 }}>
              Complete lesson plans, interactive games, foldables, and assessments aligned to AP® Cybersecurity and AP® CS Principles. Open a unit and be ready to teach tomorrow.
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
              {["✅ AP-aligned curriculum", "🎮 Student-ready games", "📄 Foldables & activities", "⏱ Less planning time"].map(b => (
                <div key={b} style={{ background: "#ffffff18", border: "1px solid #ffffff22", borderRadius: 20, padding: "5px 14px", fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#E0E7FF" }}>{b}</div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => onSelect("cyber")} style={{ background: "#0EA5E9", color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                🛡️ AP® Cybersecurity →
              </button>
              <button onClick={() => onSelect("csp")} style={{ background: "#6C63FF", color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                ⚙️ AP® CS Principles →
              </button>
            </div>
          </div>
          {!isMobile && (
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 24px 60px #00000044", background: "#000", aspectRatio: "16/9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0f172a, #1e3a5f)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#ffffffee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 0, height: 0, borderTop: "16px solid transparent", borderBottom: "16px solid transparent", borderLeft: "26px solid #1E1B4B", marginLeft: 6 }} />
                </div>
                <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", textAlign: "center", padding: "0 24px" }}>Why I Built CS Engaged</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#94A3B8", textAlign: "center" }}>Video coming soon</div>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#EF4444" }} />
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: isMobile ? "32px 12px 48px" : "48px 24px 64px" }}>
        <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: 22, color: "#1E1B4B", marginBottom: 6 }}>Choose Your Course</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#6B7280", marginBottom: 24 }}>Select a course to explore units, lessons, games, and activities.</div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
          {Object.values(COURSES).map(course => (
            <div key={course.id} onClick={() => onSelect(course.id)}
              style={{ background: "#fff", border: `2px solid ${course.color}33`, borderRadius: 18, padding: "28px 24px", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${course.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: course.color, borderRadius: "16px 16px 0 0" }} />
              <div style={{ fontSize: 32, marginBottom: 12 }}>{course.icon}</div>
              <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: 20, color: "#1E1B4B", marginBottom: 4 }}>{course.title}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#6B7280", lineHeight: 1.5, marginBottom: 4 }}>{course.description}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9CA3AF", marginBottom: 20 }}>{COURSES[course.id].units.length} units</div>
              <div style={{ background: course.color, color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, display: "inline-block", fontFamily: "'Inter', sans-serif" }}>Open Course →</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32, fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#9CA3AF" }}>More courses and games coming soon · Built for AP® classrooms</div>
      </div>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const btnStyle = (bg, disabled = false, color = "#fff") => ({
  background: disabled ? "#E5E7EB" : bg, color: disabled ? "#9CA3AF" : color,
  border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 14, fontWeight: 600,
  cursor: disabled ? "default" : "pointer", fontFamily: "'Inter', sans-serif", transition: "opacity 0.15s",
});
const codeStyle = { fontFamily: "'Space Mono', monospace", background: "#EEF2FF", color: "#4F46E5", padding: "1px 5px", borderRadius: 4, fontSize: 12 };
const sectionHeader = { fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 14, color: "#1E1B4B", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 };

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const isMobile = useIsMobile();
  const [view, setView] = useState("home");
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeUnit, setActiveUnit] = useState(null);
  const [progress, setProgress] = useState({});

  const activeCourse = activeCourseId ? COURSES[activeCourseId] : null;

  const openCourse = (courseId) => { setActiveCourseId(courseId); setView("map"); };
  const openLesson = (lesson, unit) => {
    setActiveLesson(lesson); setActiveUnit(unit);
    setView(lesson.type === "game" ? "game" : "lesson");
  };
  const goHome = () => { setView("home"); setActiveCourseId(null); setActiveLesson(null); setActiveUnit(null); };
  const goMap = () => { setView("map"); setActiveLesson(null); };

  const handleLessonNav = (lessonOrBack) => {
    if (!lessonOrBack || typeof lessonOrBack !== "object") { goMap(); return; }
    const unit = activeCourse?.units.find(u => u.lessons.some(l => l.id === lessonOrBack.id));
    if (unit) { setActiveLesson(lessonOrBack); setActiveUnit(unit); setView("lesson"); }
    else goMap();
  };

  const unitLessons = activeUnit?.lessons || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=League+Spartan:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=Space+Mono&display=swap');
        html, body, #root { margin: 0; padding: 0; width: 100%; }
        * { box-sizing: border-box; }
        body { background: #F8FAFC; font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Nav */}
      <div style={{ background: "#1E1B4B", padding: isMobile ? "0 12px" : "0 24px", display: "flex", alignItems: "center", gap: 0, height: 56 }}>
        <div onClick={goHome} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginRight: 24 }}>
          <img src="./duck.png" alt="CS Engaged" style={{ height: 36, width: 36, objectFit: "contain" }} />
          <span style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: isMobile ? 16 : 20, color: "#FBBF24", letterSpacing: 1 }}>CS Engaged</span>
        </div>
        <div style={{ display: isMobile ? "none" : "flex", alignItems: "center", gap: 4 }}>
          <button onClick={() => openCourse("cyber")}
            style={{ background: activeCourseId === "cyber" ? "#312E81" : "transparent", color: activeCourseId === "cyber" ? "#A5B4FC" : "#94A3B8", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => { if (activeCourseId !== "cyber") e.currentTarget.style.background = "#312E8166"; }}
            onMouseLeave={e => { if (activeCourseId !== "cyber") e.currentTarget.style.background = "transparent"; }}
          >AP® Cyber</button>
          <button onClick={() => openCourse("csp")}
            style={{ background: activeCourseId === "csp" ? "#312E81" : "transparent", color: activeCourseId === "csp" ? "#A5B4FC" : "#94A3B8", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => { if (activeCourseId !== "csp") e.currentTarget.style.background = "#312E8166"; }}
            onMouseLeave={e => { if (activeCourseId !== "csp") e.currentTarget.style.background = "transparent"; }}
          >AP® CS Principles</button>
        </div>
        {activeLesson && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 8 }}>
            <div style={{ color: "#4F46E5", fontSize: 13 }}>·</div>
            <div style={{ color: "#818CF8", fontSize: 13, maxWidth: isMobile ? 120 : 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{activeLesson.title}</div>
          </div>
        )}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {(view === "lesson" || view === "game") && (
            <button onClick={goMap} style={{ background: "#312E81", color: "#A5B4FC", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>← Map</button>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ minHeight: "calc(100vh - 56px)", display: "flex", flexDirection: "column" }}>
        {view === "home" && <HomeScreen onSelect={openCourse} />}
        {view === "map" && activeCourse && <CourseMap course={activeCourse} onSelectLesson={openLesson} onBack={goHome} progress={progress} />}
        {view === "lesson" && activeLesson && <LessonPage lesson={activeLesson} unit={activeUnit} onBack={handleLessonNav} allLessons={unitLessons} />}
        {view === "game" && activeLesson?.game === "boolean" && <BooleanGame onBack={goMap} progress={progress} setProgress={setProgress} />}

        {/* Footer */}
        <div style={{ background: "#1E1B4B", padding: "20px 16px", marginTop: "auto" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 12, flexWrap: "wrap" }}>
            <a href="https://www.skool.com/the-cs-educator-collective-1513/" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, color: "#94A3B8", textDecoration: "none", fontFamily: "'Inter', sans-serif", fontSize: 13 }}
              onMouseEnter={e => e.currentTarget.style.color = "#FBBF24"}
              onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
              Join the Community
            </a>
            <div style={{ width: 1, background: "#312E81" }} />
            <a href="https://www.youtube.com/@EngagedCS" target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 8, color: "#94A3B8", textDecoration: "none", fontFamily: "'Inter', sans-serif", fontSize: 13 }}
              onMouseEnter={e => e.currentTarget.style.color = "#EF4444"}
              onMouseLeave={e => e.currentTarget.style.color = "#94A3B8"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.8C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.5V9l5.4 2.8-5.4 2.7z"/></svg>
              YouTube
            </a>
          </div>
          <div style={{ textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#4B5563", lineHeight: 1.6 }}>
            © 2026 CS Engaged · AP® is a registered trademark of College Board. CS Engaged is not affiliated with or endorsed by College Board.
          </div>
        </div>
      </div>
    </>
  );
}
