import { useState, useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ahcyqgdgzwwglablcnik.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoY3lxZ2Rnend3Z2xhYmxjbmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NjM5ODgsImV4cCI6MjA5ODMzOTk4OH0.54_IiHXD7ekTCQpafWD_5Hn_sG-6FhaMhTDIVVj54Tw"
);

async function saveHighScore(userId, gameId, score) {
  if (!userId) return;
  const { data: existing, error: selectError } = await supabase
    .from("game_scores")
    .select("high_score")
    .eq("user_id", userId)
    .eq("game_id", gameId)
    .maybeSingle();

  if (selectError) {
    console.error("saveHighScore select error:", selectError);
    return;
  }

  if (!existing || score > existing.high_score) {
    const { error: upsertError } = await supabase
      .from("game_scores")
      .upsert({ user_id: userId, game_id: gameId, high_score: score, updated_at: new Date().toISOString() });
    if (upsertError) console.error("saveHighScore upsert error:", upsertError);
  }
}

async function fetchHighScores(userId) {
  if (!userId) return {};
  const { data, error } = await supabase
    .from("game_scores")
    .select("game_id, high_score")
    .eq("user_id", userId);
  if (error) {
    console.error("fetchHighScores error:", error);
    return {};
  }
  if (!data) return {};
  return data.reduce((acc, row) => ({ ...acc, [row.game_id]: row.high_score }), {});
}

async function fetchDisplayName(userId) {
  if (!userId) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) { console.error("fetchDisplayName error:", error); return null; }
  return data?.display_name || null;
}

async function saveDisplayName(userId, name) {
  if (!userId) return;
  const { error } = await supabase
    .from("profiles")
    .upsert({ user_id: userId, display_name: name, updated_at: new Date().toISOString() });
  if (error) console.error("saveDisplayName error:", error);
}

function getPrintUrl(driveUrl) {
  if (!driveUrl) return null;
  const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  const fileId = match[1];
  if (driveUrl.includes("/document/")) return `https://docs.google.com/document/d/${fileId}/export?format=pdf`;
  if (driveUrl.includes("/presentation/")) return `https://docs.google.com/presentation/d/${fileId}/export/pdf`;
  if (driveUrl.includes("/spreadsheets/")) return `https://docs.google.com/spreadsheets/d/${fileId}/export?format=pdf`;
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

const SLIDE_LINKS = {
  "cyber_1_1": "https://docs.google.com/presentation/d/1eNm-lAfWiC_H5rmRTCixSwGFV6iax-Cdx-2bBalPZYo/edit",
  "cyber_1_2": "https://docs.google.com/presentation/d/1kMvfUOWL1p-MZ5wjd4vo6DONxtYm2geL7MdcjNAaY8g/edit",
  "cyber_1_3": "https://docs.google.com/presentation/d/1GwhpoQmiKnsWGGo3qHQAKQ4wbqcqyRcUN3WlUvY6mXU/edit",
  "cyber_1_4": "https://docs.google.com/presentation/d/1_p5l5NehOUVVKoPXXmqbypGqNt2MIXK4avpyZpOEALY/edit",
  "cyber_1_5": "https://docs.google.com/presentation/d/1YAistZcGGiNai4dgu8yGS9GO1GWufO_bnojbCkwGpfA/edit",
};

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
          { id: "csp_bi2_7", codeOrg: "U1L4", title: "Binary Converter Game", type: "game", unlocked: true, description: "Flip bits to build a target decimal number. 8 progressive levels covering binary place value and conversion.", game: "binary", levels: 8 },
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
    id: "cyber", title: "AP® Cybersecurity", shortTitle: "AP® Cybersecurity",
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

const ARCADE_GAMES = [
  { id: "boolean", title: "Boolean Logic", description: "Click shapes that match AND, OR, NOT, and XOR expressions. 8 progressive levels.", icon: "🔷", color: "#6C63FF", levels: 8, course: "AP® CS Principles", locked: false, progressKey: "csp_u1l1" },
  { id: "binary", title: "Binary Converter", description: "Flip bits to build a target decimal number. Master binary place value through 8 levels.", icon: "💾", color: "#F59E0B", levels: 8, course: "AP® CS Principles", locked: false, progressKey: "csp_bi2_7" },
  { id: "phishing", title: "Phishing or Legit?", description: "Examine real-looking emails and decide if they're safe or a scam. Gets trickier each round.", icon: "🎣", color: "#0EA5E9", levels: 0, course: "AP® Cybersecurity", locked: true, comingSoon: true },
  { id: "conditionals", title: "Conditionals Maze", description: "Set IF/ELSE rules before your character runs the maze. Plan the path before you move.", icon: "🧭", color: "#8B5CF6", levels: 0, course: "AP® CS Principles", locked: true, comingSoon: true },
  { id: "firewall", title: "Firewall Rules", description: "Drag rules into place to allow or block network traffic and stop the attack.", icon: "🧱", color: "#EF4444", levels: 0, course: "AP® Cybersecurity", locked: true, comingSoon: true },
  { id: "cipher", title: "Cipher Cracker", description: "Encode and decode messages using Caesar and substitution ciphers.", icon: "🔐", color: "#10B981", levels: 0, course: "AP® Cybersecurity", locked: true, comingSoon: true },
];

const AGENDA_COLORS = {
  LAUNCH:   { bg: "#FEF3C7", color: "#92400E", label: "LAUNCH" },
  DIRECT:   { bg: "#EEF2FF", color: "#3730A3", label: "DIRECT INSTRUCTION" },
  APPLY:    { bg: "#DCFCE7", color: "#166534", label: "APPLY" },
  ACTIVITY: { bg: "#F3E8FF", color: "#6B21A8", label: "ACTIVITY" },
  ASSESS:   { bg: "#FEE2E2", color: "#991B1B", label: "ASSESSMENT" },
};

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

function BooleanGame({ onBack, progress, setProgress, user }) {
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
  const [confirmEnd, setConfirmEnd] = useState(false);

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
    if (level >= 8) {
      setComplete(true);
      setProgress(prev => ({ ...prev, [levelKey]: 8 }));
      saveHighScore(user?.id, "boolean", score);
    } else { const nl = level + 1; setLevel(nl); setProgress(prev => ({ ...prev, [levelKey]: nl - 1 })); }
  };

  const endGame = () => {
    saveHighScore(user?.id, "boolean", score);
    setProgress(prev => ({ ...prev, [levelKey]: level - 1 }));
    onBack();
  };

  if (complete) return (
    <div style={{ textAlign: "center", padding: 48 }}>
      <div style={{ fontSize: 64 }}>🎉</div>
      <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 28, color: "#1E1B4B", marginBottom: 8 }}>Boolean Logic Mastered!</h2>
      <p style={{ color: "#6B7280", marginBottom: 32 }}>Final score: <strong>{score} pts</strong></p>
      <button onClick={onBack} style={btnStyle("#6C63FF")}>← Back to Arcade</button>
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
          <button onClick={() => setConfirmEnd(true)} style={{ background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>End Game</button>
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
      {confirmEnd && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(30, 27, 75, 0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", maxWidth: 340, textAlign: "center" }}>
            <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 18, color: "#1E1B4B", marginBottom: 8 }}>End this game?</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#6B7280", marginBottom: 20, lineHeight: 1.5 }}>
              Your score of <strong>{score} pts</strong> will be saved if it's a new high score. You'll exit to the Arcade.
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setConfirmEnd(false)} style={btnStyle("#F3F4F6", false, "#374151")}>Keep Playing</button>
              <button onClick={endGame} style={btnStyle("#EF4444")}>End Game</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getBitCount(level) {
  if (level <= 2) return 4;
  if (level <= 5) return 6;
  return 8;
}

function generateBinaryTarget(level, bitCount) {
  const max = Math.pow(2, bitCount) - 1;
  let target;
  if (level <= 2) target = Math.floor(Math.random() * 15) + 1;
  else target = Math.floor(Math.random() * (max - 1)) + 1;
  return target;
}

function bitsToDecimal(bits) {
  return bits.reduce((acc, bit, i) => acc + (bit ? Math.pow(2, bits.length - 1 - i) : 0), 0);
}

function getTimerSeconds(level) {
  if (level <= 3) return null;
  if (level === 4) return 45;
  if (level === 5) return 40;
  if (level === 6) return 35;
  if (level === 7) return 30;
  return 25;
}

function BinaryGame({ onBack, progress, setProgress, user }) {
  const isMobile = useIsMobile();
  const levelKey = "csp_bi2_7";
  const startLevel = (progress[levelKey] || 0) + 1;
  const [level, setLevel] = useState(Math.min(startLevel, 8));
  const [bitCount, setBitCount] = useState(getBitCount(1));
  const [target, setTarget] = useState(0);
  const [bits, setBits] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [complete, setComplete] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [showValueGoneNotice, setShowValueGoneNotice] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [paused, setPaused] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const hideValue = level >= 2;
  const hidePlaceValues = level >= 3;
  const timerSeconds = getTimerSeconds(level);

  const loadLevel = useCallback((lvl) => {
    const bc = getBitCount(lvl);
    const t = generateBinaryTarget(lvl, bc);
    setBitCount(bc);
    setTarget(t);
    setBits(Array(bc).fill(false));
    setRevealed(false);
    setFeedback(null);
    setPaused(false);
    setTimedOut(false);
    const ts = getTimerSeconds(lvl);
    setTimeLeft(ts);
    if (lvl === 2) setShowValueGoneNotice(true);
  }, []);

  useEffect(() => { loadLevel(level); }, [level, loadLevel]);

  useEffect(() => {
    if (timeLeft === null || revealed || paused || complete) return;
    if (timeLeft <= 0) { setTimedOut(true); setRevealed(true); setStreak(0); setFeedback({ ok: false, msg: "⏱ Time's up! Try again." }); return; }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, revealed, paused, complete]);

  const toggleBit = (idx) => {
    if (revealed || paused) return;
    setBits(prev => prev.map((b, i) => i === idx ? !b : b));
  };

  const currentValue = bitsToDecimal(bits);

  const check = () => {
    setRevealed(true);
    const isRight = currentValue === target;
    if (isRight) {
      const pts = 100 + streak * 25;
      setScore(s => s + pts); setStreak(s => s + 1);
      setFeedback({ ok: true, msg: streak >= 2 ? `🔥 ${streak + 1}× streak! +${pts}pts` : `✓ Correct! +${pts}pts` });
    } else {
      setStreak(0);
      setFeedback({ ok: false, msg: `✗ You built ${currentValue}, target was ${target}. Try again!` });
    }
  };

  const next = () => {
    if (level >= 8) {
      setComplete(true);
      setProgress(prev => ({ ...prev, [levelKey]: 8 }));
      saveHighScore(user?.id, "binary", score);
    } else { const nl = level + 1; setLevel(nl); setProgress(prev => ({ ...prev, [levelKey]: nl - 1 })); }
  };

  const endGame = () => {
    saveHighScore(user?.id, "binary", score);
    setProgress(prev => ({ ...prev, [levelKey]: level - 1 }));
    onBack();
  };

  const retry = () => loadLevel(level);

  if (complete) return (
    <div style={{ textAlign: "center", padding: 48 }}>
      <div style={{ fontSize: 56, lineHeight: 1, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 28, color: "#1E1B4B", marginBottom: 8 }}>Binary Converter Mastered!</h2>
      <p style={{ color: "#6B7280", marginBottom: 32 }}>Final score: <strong>{score} pts</strong></p>
      <button onClick={onBack} style={btnStyle("#F59E0B")}>← Back to Arcade</button>
    </div>
  );

  const levelLabels = ["", "4-bit Basics", "4-bit Basics", "4-bit Practice", "6-bit Numbers", "6-bit Numbers", "6-bit Mastery", "8-bit Challenge", "8-bit Challenge"];
  const placeValues = bits.map((_, i) => Math.pow(2, bits.length - 1 - i));

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "20px 16px", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#6B7280" }}>←</button>
        <div>
          <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 18, color: "#1E1B4B" }}>Binary Converter</div>
          <div style={{ fontSize: 12, color: "#9CA3AF" }}>DAT-1.C · Level {level} of 8 · {levelLabels[level]}</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center" }}>
          {timerSeconds !== null && !revealed && (
            <button onClick={() => setPaused(p => !p)} style={{ background: "#F3F4F6", border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif", color: "#374151" }}>
              {paused ? "▶ Resume" : "⏸ Pause"}
            </button>
          )}
          {timerSeconds !== null && (
            <div style={{ background: timeLeft <= 10 ? "#FEE2E2" : "#F3F4F6", color: timeLeft <= 10 ? "#991B1B" : "#374151", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>⏱ {timeLeft}s</div>
          )}
          {streak >= 2 && <div style={{ background: "#FEF3C7", color: "#D97706", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>🔥 {streak}×</div>}
          <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, color: "#F59E0B", fontSize: 18 }}>{score} pts</div>
          <button onClick={() => setConfirmEnd(true)} style={{ background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>End Game</button>
        </div>
      </div>

      <div style={{ height: 4, background: "#E5E7EB", borderRadius: 4, marginBottom: 24 }}>
        <div style={{ height: 4, background: "#F59E0B", borderRadius: 4, width: `${((level - 1) / 8) * 100}%`, transition: "width 0.4s" }} />
      </div>

      {showValueGoneNotice && (
        <div style={{ background: "#EFF6FF", border: "2px solid #BFDBFE", borderRadius: 12, padding: "12px 16px", marginBottom: 18, display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.2 }}>💡</span>
          <div style={{ flex: 1, fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#1E3A8A", lineHeight: 1.5 }}>
            Starting this level, your running total is hidden — you'll need to add up the place values yourself before checking.
          </div>
          <button onClick={() => setShowValueGoneNotice(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1E3A8A", fontSize: 16, lineHeight: 1, flexShrink: 0 }}>×</button>
        </div>
      )}

      <div style={{ background: "#FFFBEB", border: "2px solid #FDE68A", borderRadius: 14, padding: "18px 22px", marginBottom: 22, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#92400E", marginBottom: 6, textTransform: "uppercase" }}>Build this decimal number:</div>
        <div style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 48, fontWeight: 800, color: "#1E1B4B" }}>{target}</div>
        <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>using {bitCount} bits</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: isMobile ? 6 : 10, marginBottom: 14, flexWrap: "wrap" }}>
        {bits.map((bit, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "'Inter', sans-serif", height: 14, visibility: hidePlaceValues ? "hidden" : "visible" }}>{placeValues[i]}</div>
            <div
              onClick={() => toggleBit(i)}
              style={{
                width: isMobile ? 38 : 52, height: isMobile ? 50 : 68, borderRadius: 10,
                background: bit ? "#F59E0B" : "#F3F4F6",
                border: revealed ? (bit === Boolean((target >> (bits.length - 1 - i)) & 1) ? "3px solid #22C55E" : "3px solid #EF4444") : "2px solid #E5E7EB",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.15s",
                fontFamily: "'Space Mono', monospace", fontSize: isMobile ? 18 : 22, fontWeight: 700,
                color: bit ? "#fff" : "#9CA3AF",
              }}
            >
              {bit ? "1" : "0"}
            </div>
          </div>
        ))}
      </div>

      {!hideValue && (
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#9CA3AF" }}>Your value: </span>
          <span style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 22, fontWeight: 700, color: currentValue === target ? "#22C55E" : "#1E1B4B" }}>{currentValue}</span>
        </div>
      )}

      {feedback && <div style={{ padding: "12px 16px", borderRadius: 10, marginBottom: 16, fontSize: 14, background: feedback.ok ? "#DCFCE7" : "#FEE2E2", color: feedback.ok ? "#166534" : "#991B1B", fontWeight: 500, textAlign: "center" }}>{feedback.msg}</div>}

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {!revealed ? (
          <button onClick={check} style={btnStyle("#F59E0B")}>Check Answer</button>
        ) : feedback?.ok ? (
          <button onClick={next} style={btnStyle("#F59E0B")}>{level >= 8 ? "Finish 🎉" : "Next Level →"}</button>
        ) : (
          <button onClick={retry} style={btnStyle("#F59E0B")}>Try Again</button>
        )}
      </div>

      <div style={{ marginTop: 28, padding: "14px 18px", background: "#F9FAFB", borderRadius: 10, border: "1px solid #E5E7EB" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>How It Works</div>
        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
          Each bit represents a power of 2. Flip bits to "1" to add that place value to your total. Build the target number by adding up the place values of every bit you turn on.
        </div>
      </div>

      {paused && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(30, 27, 75, 0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1000, gap: 20 }}>
          <div style={{ fontSize: 48 }}>⏸</div>
          <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 24, color: "#fff" }}>Paused</div>
          <button onClick={() => setPaused(false)} style={btnStyle("#F59E0B")}>▶ Resume</button>
        </div>
      )}
      {confirmEnd && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(30, 27, 75, 0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", maxWidth: 340, textAlign: "center" }}>
            <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 18, color: "#1E1B4B", marginBottom: 8 }}>End this game?</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#6B7280", marginBottom: 20, lineHeight: 1.5 }}>
              Your score of <strong>{score} pts</strong> will be saved if it's a new high score. You'll exit to the Arcade.
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setConfirmEnd(false)} style={btnStyle("#F3F4F6", false, "#374151")}>Keep Playing</button>
              <button onClick={endGame} style={btnStyle("#EF4444")}>End Game</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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

function ScoresPage({ onBack, highScores }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: isMobile ? "20px 16px 48px" : "32px 24px 64px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: 14, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>← Home</button>
      <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: 26, color: "#1E1B4B", marginBottom: 6 }}>🏆 My Scores</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#6B7280", marginBottom: 28 }}>Your personal best on every Arcade game.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ARCADE_GAMES.filter(g => !g.locked).map(g => (
          <div key={g.id} style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${g.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{g.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 15, color: "#1E1B4B" }}>{g.title}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9CA3AF" }}>{g.course}</div>
            </div>
            <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: 20, color: g.color }}>
              {highScores[g.id] !== undefined ? `${highScores[g.id]}` : "—"}
              {highScores[g.id] !== undefined && <span style={{ fontSize: 12, fontWeight: 500, color: "#9CA3AF", marginLeft: 4 }}>pts</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArcadePage({ onBack, onPlayGame, progress }) {
  const isMobile = useIsMobile();

  const renderGame = (game) => {
    const lvlDone = progress[game.progressKey] || 0;
    const pct = game.levels ? Math.round((lvlDone / game.levels) * 100) : 0;
    return (
      <div key={game.id}
        onClick={() => !game.locked && onPlayGame(game.id)}
        style={{
          background: "#fff", border: `2px solid ${game.locked ? "#E5E7EB" : game.color + "33"}`, borderRadius: 16,
          padding: "22px 20px", cursor: game.locked ? "default" : "pointer",
          opacity: game.locked ? 0.6 : 1, position: "relative", overflow: "hidden",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={e => { if (!game.locked) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 28px ${game.color}22`; } }}
        onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: game.locked ? "#E5E7EB" : game.color }} />
        <div style={{ marginBottom: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: game.locked ? "#F3F4F6" : `${game.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
            {game.locked ? "🔒" : game.icon}
          </div>
        </div>
        <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 16, color: "#1E1B4B", marginBottom: 6 }}>{game.title}</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#6B7280", lineHeight: 1.5, marginBottom: 14 }}>{game.description}</div>
        {game.comingSoon ? (
          <div style={{ fontSize: 11, background: "#F3F4F6", color: "#9CA3AF", padding: "4px 10px", borderRadius: 8, display: "inline-block", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Coming Soon</div>
        ) : (
          <>
            <div style={{ height: 4, background: "#F3F4F6", borderRadius: 4, marginBottom: 6 }}>
              <div style={{ height: 4, width: `${pct}%`, background: game.color, borderRadius: 4 }} />
            </div>
            <div style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>{lvlDone}/{game.levels} levels · Play now →</div>
          </>
        )}
      </div>
    );
  };

  const renderSection = (title, color, icon, games) => (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{icon}</div>
        <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 15, color: "#1E1B4B" }}>{title}</div>
        <div style={{ flex: 1, height: 1, background: "#E5E7EB", marginLeft: 4 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {games.map(renderGame)}
      </div>
    </div>
  );

  const cspGames = ARCADE_GAMES.filter(g => g.course === "AP® CS Principles");
  const cyberGames = ARCADE_GAMES.filter(g => g.course === "AP® Cybersecurity");

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #4C1D95 50%, #1E3A5F 100%)", padding: isMobile ? "28px 16px 24px" : "44px 24px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#A5B4FC", fontSize: 14, fontFamily: "'Inter', sans-serif", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>← Home</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: isMobile ? 32 : 40 }}>🕹️</span>
            <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: isMobile ? 26 : 34, color: "#fff" }}>Arcade</div>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", color: "#A5B4FC", fontSize: 15, lineHeight: 1.6 }}>
            Interactive games tied directly to AP® course content. Students play, you teach less and review more.
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "24px 16px 48px" : "36px 24px 64px" }}>
        {renderSection("AP® CS Principles", "#6C63FF", "⚙️", cspGames)}
        {renderSection("AP® Cybersecurity", "#0EA5E9", "🛡️", cyberGames)}
      </div>
    </div>
  );
}

function CourseMap({ course, onSelectLesson, onBack, progress, user, onSignIn }) {
  const isMobile = useIsMobile();
  const [openUnits, setOpenUnits] = useState({});
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
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{unit.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 16, color: "#1E1B4B", textAlign: "left" }}>{unit.title}</div>
                {unit.description && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9CA3AF", marginTop: 2, textAlign: "left" }}>{unit.description} · {unit.lessons.length} {isCSP ? "resources" : "lessons"}</div>}
              </div>
              <div style={{ color: "#9CA3AF", fontWeight: 700, fontSize: 18 }}>{openUnits[unit.id] ? "▲" : "▼"}</div>
            </div>

            {openUnits[unit.id] && isCSP && unit.bigIdeaDesc && (
              <div style={{ padding: "12px 20px", background: `${unit.color}06`, borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{unit.bigIdeaDesc}</div>
              </div>
            )}

            {openUnits[unit.id] && (
              <div style={{ background: "#fff" }}>
                {!isCSP && unit.lessons.every(l => l.comingSoon) && !user ? (
                  <div style={{ padding: "28px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>🔐</div>
                    <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 16, color: "#1E1B4B", marginBottom: 6 }}>Sign in to preview upcoming content</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#6B7280", marginBottom: 16 }}>Create a free account to get early access as lessons are added.</div>
                    <button onClick={onSignIn} style={{ background: "#0EA5E9", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      Sign in with Google — it's free
                    </button>
                  </div>
                ) : null}
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
                            {lesson.driveUrl && getPrintUrl(lesson.driveUrl) && (
                              <a href={getPrintUrl(lesson.driveUrl)} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                                style={{ fontSize: 9, background: "#F3F4F6", color: "#374151", borderRadius: 5, padding: "2px 6px", fontFamily: "'Inter', sans-serif", fontWeight: 600, whiteSpace: "nowrap", textDecoration: "none" }}>
                                🖨️ Print
                              </a>
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

function HomeScreen({ onSelect, onArcade, user, displayName }) {
  const isMobile = useIsMobile();
  return (
    <div>
      {!user ? (
        <div style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #1E3A5F 100%)", padding: isMobile ? "36px 16px 32px" : "60px 24px 56px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 48, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: isMobile ? 26 : 36, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>
                Ready-to-teach AP® CS resources — built to genuinely engage your students.
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#A5B4FC", lineHeight: 1.7, marginBottom: 28 }}>
                Complete lesson plans, interactive games, foldables, and assessments aligned to AP® Cybersecurity and AP® CS Principles. Resources that you can teach tomorrow.
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
                  <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", textAlign: "center", padding: "0 24px" }}>Why I Built Engaged CS</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#94A3B8", textAlign: "center" }}>Video coming soon</div>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#EF4444" }} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)", padding: isMobile ? "28px 16px 24px" : "40px 24px 36px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, color: "#fff", marginBottom: 6 }}>
              Welcome back{displayName ? `, ${displayName}` : user.email ? `, ${user.email.split("@")[0]}` : ""}!
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#A5B4FC" }}>
              Pick up where you left off, or explore something new.
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 800, margin: "0 auto", padding: isMobile ? "32px 12px 48px" : "48px 24px 64px" }}>
        <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: 22, color: "#1E1B4B", marginBottom: 6 }}>Choose Your Course</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#6B7280", marginBottom: 24 }}>Select a course to explore units, lessons, games, and activities.</div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
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

        <div onClick={onArcade}
          style={{ background: "linear-gradient(135deg, #1E1B4B, #4C1D95)", borderRadius: 18, padding: "24px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: 18, transition: "transform 0.15s", position: "relative", overflow: "hidden" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
        >
          <div style={{ fontSize: 40 }}>🕹️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 4 }}>Visit the Arcade</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#C7D2FE" }}>All games in one place — Boolean Logic, Binary Converter, and more coming soon.</div>
          </div>
          <div style={{ color: "#fff", fontSize: 22 }}>→</div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32, fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#9CA3AF" }}>More courses and games coming soon · Built for AP® classrooms</div>
      </div>
    </div>
  );
}

const btnStyle = (bg, disabled = false, color = "#fff") => ({
  background: disabled ? "#E5E7EB" : bg, color: disabled ? "#9CA3AF" : color,
  border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 14, fontWeight: 600,
  cursor: disabled ? "default" : "pointer", fontFamily: "'Inter', sans-serif", transition: "opacity 0.15s",
});
const codeStyle = { fontFamily: "'Space Mono', monospace", background: "#EEF2FF", color: "#4F46E5", padding: "1px 5px", borderRadius: 4, fontSize: 12 };
const sectionHeader = { fontFamily: "'League Spartan', sans-serif", fontWeight: 700, fontSize: 14, color: "#1E1B4B", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 };

export default function App() {
  const isMobile = useIsMobile();
  const [view, setView] = useState("home");
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeUnit, setActiveUnit] = useState(null);
  const [activeGame, setActiveGame] = useState(null);
  const [progress, setProgress] = useState({});
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [highScores, setHighScores] = useState({});
  const [profileOpen, setProfileOpen] = useState(false);
  const [displayName, setDisplayName] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const activeCourse = activeCourseId ? COURSES[activeCourseId] : null;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      fetchHighScores(user.id).then(setHighScores);
      fetchDisplayName(user.id).then(name => { setDisplayName(name); setNameInput(name || ""); });
    }
  }, [user]);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const handleSaveName = async () => {
    await saveDisplayName(user.id, nameInput.trim());
    setDisplayName(nameInput.trim());
    setEditingName(false);
  };

  const openCourse = (courseId) => { setActiveCourseId(courseId); setView("map"); };
  const openLesson = (lesson, unit) => {
    setActiveLesson(lesson); setActiveUnit(unit);
    setView(lesson.type === "game" ? "game" : "lesson");
    setActiveGame(lesson.type === "game" ? lesson.game : null);
  };
  const goHome = () => { setView("home"); setActiveCourseId(null); setActiveLesson(null); setActiveUnit(null); setActiveGame(null); };
  const goScores = () => { setView("scores"); setActiveCourseId(null); setActiveLesson(null); setActiveGame(null); setProfileOpen(false); };
  const goMap = () => { setView("map"); setActiveLesson(null); setActiveGame(null); };
  const goArcade = () => { setView("arcade"); setActiveCourseId(null); setActiveLesson(null); setActiveGame(null); };
  const playArcadeGame = (gameId) => { setActiveGame(gameId); setView("game"); };
  const backFromGame = () => {
    setView(activeCourseId ? "map" : "arcade");
    setActiveGame(null);
    if (user) fetchHighScores(user.id).then(setHighScores);
  };

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

      <div style={{ background: "#1E1B4B", padding: isMobile ? "0 12px" : "0 24px", display: "flex", alignItems: "center", gap: 0, height: 56 }}>
        <div onClick={goHome} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginRight: 24 }}>
          <img src="./duck.png" alt="Engaged CS" style={{ height: 36, width: 36, objectFit: "contain" }} />
          <span style={{ fontFamily: "'Luckiest Guy', cursive", fontSize: isMobile ? 16 : 20, color: "#FBBF24", letterSpacing: 1 }}>Engaged CS</span>
        </div>
        <div style={{ display: isMobile ? "none" : "flex", alignItems: "center", gap: 4 }}>
          <button onClick={() => openCourse("cyber")}
            style={{ background: activeCourseId === "cyber" ? "#312E81" : "transparent", color: activeCourseId === "cyber" ? "#A5B4FC" : "#94A3B8", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => { if (activeCourseId !== "cyber") e.currentTarget.style.background = "#312E8166"; }}
            onMouseLeave={e => { if (activeCourseId !== "cyber") e.currentTarget.style.background = "transparent"; }}
          >AP® Cybersecurity</button>
          <button onClick={() => openCourse("csp")}
            style={{ background: activeCourseId === "csp" ? "#312E81" : "transparent", color: activeCourseId === "csp" ? "#A5B4FC" : "#94A3B8", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => { if (activeCourseId !== "csp") e.currentTarget.style.background = "#312E8166"; }}
            onMouseLeave={e => { if (activeCourseId !== "csp") e.currentTarget.style.background = "transparent"; }}
          >AP® CS Principles</button>
          <button onClick={goArcade}
            style={{ background: view === "arcade" ? "#312E81" : "transparent", color: view === "arcade" ? "#A5B4FC" : "#94A3B8", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}
            onMouseEnter={e => { if (view !== "arcade") e.currentTarget.style.background = "#312E8166"; }}
            onMouseLeave={e => { if (view !== "arcade") e.currentTarget.style.background = "transparent"; }}
          >🕹️ Arcade</button>
        </div>
        {activeLesson && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 8 }}>
            <div style={{ color: "#4F46E5", fontSize: 13 }}>·</div>
            <div style={{ color: "#818CF8", fontSize: 13, maxWidth: isMobile ? 120 : 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{activeLesson.title}</div>
          </div>
        )}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          {(view === "lesson" || view === "game") && (
            <button onClick={backFromGame} style={{ background: "#312E81", color: "#A5B4FC", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>← Back</button>
          )}
          {!authLoading && (
            user ? (
              <div style={{ position: "relative" }}>
                <button onClick={() => setProfileOpen(o => !o)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "6px 10px", borderRadius: 8 }}>
                  {!isMobile && <span style={{ fontSize: 12, color: "#94A3B8", fontFamily: "'Inter', sans-serif", maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</span>}
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#312E81", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                    {user.email[0].toUpperCase()}
                  </div>
                </button>
                {profileOpen && (
                  <div style={{ position: "absolute", top: 44, right: 0, background: "#fff", borderRadius: 12, boxShadow: "0 12px 32px #00000033", width: 220, padding: "10px", zIndex: 100 }}>
                    <div style={{ padding: "4px 8px 10px", borderBottom: "1px solid #F3F4F6", marginBottom: 6 }}>
                      {editingName ? (
                        <div style={{ display: "flex", gap: 6 }}>
                          <input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="Your name"
                            style={{ flex: 1, fontSize: 13, padding: "6px 8px", borderRadius: 6, border: "1px solid #E5E7EB", fontFamily: "'Inter', sans-serif" }} />
                          <button onClick={handleSaveName} style={{ background: "#312E81", color: "#fff", border: "none", borderRadius: 6, padding: "0 10px", fontSize: 12, cursor: "pointer" }}>Save</button>
                        </div>
                      ) : (
                        <div onClick={() => setEditingName(true)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B", fontFamily: "'Inter', sans-serif" }}>{displayName || "Add your name"}</span>
                          <span style={{ fontSize: 11, color: "#9CA3AF" }}>✏️ Edit</span>
                        </div>
                      )}
                    </div>
                    <button onClick={goScores} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 8px", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: "'Inter', sans-serif", borderRadius: 8, display: "flex", alignItems: "center", gap: 8 }}>
                      🏆 My Scores
                    </button>
                    <button onClick={signOut} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 8px", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: "'Inter', sans-serif", borderRadius: 8 }}>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={signInWithGoogle} style={{ background: "#fff", color: "#1E1B4B", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                {isMobile ? "Sign in" : "Sign in with Google"}
              </button>
            )
          )}
        </div>
      </div>

      <div style={{ minHeight: "calc(100vh - 56px)", display: "flex", flexDirection: "column" }}>
        {view === "home" && <HomeScreen onSelect={openCourse} onArcade={goArcade} user={user} displayName={displayName} />}
        {view === "map" && activeCourse && <CourseMap course={activeCourse} onSelectLesson={openLesson} onBack={goHome} progress={progress} user={user} onSignIn={signInWithGoogle} />}
        {view === "arcade" && <ArcadePage onBack={goHome} onPlayGame={playArcadeGame} progress={progress} />}
        {view === "scores" && user && <ScoresPage onBack={goHome} highScores={highScores} />}
        {view === "lesson" && activeLesson && <LessonPage lesson={activeLesson} unit={activeUnit} onBack={handleLessonNav} allLessons={unitLessons} />}
        {view === "game" && activeGame === "boolean" && <BooleanGame onBack={backFromGame} progress={progress} setProgress={setProgress} user={user} />}
        {view === "game" && activeGame === "binary" && <BinaryGame onBack={backFromGame} progress={progress} setProgress={setProgress} user={user} />}

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
            © 2026 Engaged CS · AP® is a registered trademark of College Board. Engaged CS is not affiliated with or endorsed by College Board.
          </div>
        </div>
      </div>
    </>
  );
}
