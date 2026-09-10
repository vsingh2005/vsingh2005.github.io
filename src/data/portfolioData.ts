export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Quantum & AI" | "Embedded & Hardware" | "Cloud & Systems";
  period: string;
  featured: boolean;
  award?: string;
  heroImage?: string;
  summary: string;
  role: string;
  organization?: string;
  technologies: string[];
  metrics: { label: string; value: string; description: string }[];
  problem: string;
  architecture: {
    title: string;
    description: string;
    points: string[];
  };
  keyFeatures: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  results: string[];
  links: {
    github?: string;
    demo?: string;
    paper?: string;
  };
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: "Internship" | "Leadership & Industry" | "Mentorship";
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
  metricsBadge?: string;
}

export interface Education {
  school: string;
  college: string;
  degree: string;
  field: string;
  location: string;
  graduation: string;
  highlights: string[];
  courses: string[];
}

export interface SkillCategory {
  title: string;
  tagline: string;
  iconName: string;
  skills: {
    name: string;
    level: "Advanced" | "Proficient" | "Specialized";
    badge?: string;
  }[];
}

export const PERSONAL_INFO = {
  name: "Vansh",
  fullName: "Vansh Singh",
  title: "Computer Engineer | Cloud Infrastructure, Mechatronics & Systems",
  tagline: "B.S. in Computer Engineering & M.S. in Business Analytics at UMass Amherst. Engineering automated cloud environments with Terraform, embedded robotics, and data analytics systems.",
  bio: "Graduate student at UMass Amherst pursuing an MSBA in Business Analytics with a B.S. in Computer Engineering. Experienced in cloud automation with Terraform/AWS, embedded mechatronics, and applied systems engineering.",
  email: "vanshsingh@umass.edu",
  github: "https://github.com/vsingh2005",
  githubHandle: "vsingh2005",
  locations: ["Chicago, IL", "Amherst, MA"],
  resumePdf: "/Vansh_Singh_Resume.pdf",
  portfolioPdf: "/Vansh_Singh_Portfolio.pdf",
  status: "Open to Software, Cloud & Systems Roles",
  stats: [
    { value: "2nd", label: "Global ASME Mechatronics", change: "40+ Universities" },
    { value: "40%", label: "Cloud Provisioning Boost", change: "Terraform & AWS IaC" },
    { value: "150+", label: "Engineers & Students Taught", change: "Embedded & Robotics" },
    { value: "6", label: "Engineers Led", change: "U.S. DOE Collegiate Wind" },
  ]
};

export const EDUCATIONS: Education[] = [
  {
    school: "University of Massachusetts Amherst",
    college: "Isenberg School of Management",
    degree: "Master of Science",
    field: "Business Analytics (MSBA)",
    location: "Amherst, MA",
    graduation: "Currently Pursuing (2026 - 2027)",
    highlights: [
      "Quantitative data modeling, high-volume processing, and enterprise optimization.",
      "Combining technical engineering systems with scalable business intelligence."
    ],
    courses: [
      "High-Volume Data Processing",
      "Predictive Modeling & AI",
      "Enterprise Data Architecture",
      "Quantitative Business Analytics",
      "Cloud Strategy & Optimization"
    ]
  },
  {
    school: "University of Massachusetts Amherst",
    college: "Riccio College of Engineering",
    degree: "Bachelor of Science",
    field: "Computer Engineering",
    location: "Amherst, MA",
    graduation: "BS Completed",
    highlights: [
      "Focused on computer systems, microarchitectures, and cloud infrastructure.",
      "Electrical subteam lead for ASME IAM3D and U.S. DOE Collegiate Wind teams.",
      "Coursework in logic design, embedded systems, and circuit simulation."
    ],
    courses: [
      "Computer Architecture",
      "Embedded Systems Design",
      "SystemVerilog & Digital Logic",
      "Data Structures & Algorithms",
      "Signals & Systems",
      "Power Electronics & Circuit Simulation"
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "umass-it",
    role: "Cloud Infrastructure Engineering Intern",
    company: "University of Massachusetts Amherst IT",
    location: "Amherst, MA",
    period: "Sept 2025 - Present",
    type: "Internship",
    current: true,
    description: "Building automated cloud infrastructure across AWS and hybrid environments for university systems.",
    highlights: [
      "Architect and deploy cloud infrastructure and CI/CD automation pipelines across AWS using Terraform, cutting provisioning turnaround by 40% and eliminating manual configuration drift.",
      "Develop automated monitoring, health-check, and telemetry services in Python and Bash to improve service uptime and isolate faults across academic IT platforms.",
      "Write reusable Terraform modules and containerized microservices in Docker to standardize deployment setups across 6 engineering teams.",
      "Participate in Agile sprints, architecture reviews, and automated integration testing."
    ],
    technologies: ["AWS (EC2, S3, Lambda, IAM)", "Terraform", "Docker", "Python", "Bash", "CI/CD", "Linux/Unix", "Git"],
    metricsBadge: "40% Faster Provisioning"
  },
  {
    id: "stem-studio",
    role: "Systems & Embedded Engineering Lead / Instructor",
    company: "Stem Studio",
    location: "Chicago, IL",
    period: "May 2023 - Present",
    type: "Leadership & Industry",
    current: true,
    description: "Managing technical systems, running embedded hardware labs, and handling infrastructure security.",
    highlights: [
      "Led emergency incident response and security cleanup for a server-side cloaking and backdoor exploit on production servers, restoring stability and fixing WSOD issues.",
      "Created and taught hands-on embedded computing curricula (microcontrollers, circuit design, sensor interfacing, and robotics) for 150+ students, raising project pass rates by 35%.",
      "Wrote and maintained lab guides, hardware documentation, and sample code repositories for reproducible teaching."
    ],
    technologies: ["Embedded C", "ARM Cortex", "ESP32", "Arduino", "I2C/SPI/UART", "Linux Hardening", "PHP/Security"],
    metricsBadge: "150+ Students Taught"
  },
  {
    id: "codeday",
    role: "Technical Mentor & Lead Instructor",
    company: "CodeDay",
    location: "Global Initiative",
    period: "Aug 2020 - Aug 2023",
    type: "Mentorship",
    current: false,
    description: "Mentoring student developers through software design, full-stack web builds, and version control.",
    highlights: [
      "Mentored 20+ student engineering teams through complete project lifecycles, covering data structures, API integrations, algorithms, and Git workflows.",
      "Ran regular code reviews, debugging walkthroughs, and architecture discussions to help teams ship functional software.",
      "Supported hackathon teams and assisted developers with technical troubleshooting."
    ],
    technologies: ["Python", "JavaScript", "REST APIs", "Git/GitHub", "Data Structures", "Web Frameworks"],
    metricsBadge: "20+ Student Teams"
  }
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "quantum-hybrid-nn",
    slug: "quantum-hybrid-nn",
    title: "Quantum-Classical Hybrid Neural Network",
    subtitle: "Variational Quantum Circuits on AWS Braket with PennyLane",
    category: "Quantum & AI",
    period: "Nov 2025 - Present",
    featured: true,
    summary: "A hybrid neural network combining classical convolutional layers with parameterized variational quantum circuits on AWS Braket, achieving 28% faster epoch convergence and higher parameter efficiency.",
    role: "Lead Architect & Quantum ML Developer",
    technologies: ["PyTorch", "PennyLane", "AWS Braket", "Python", "Qiskit", "NumPy"],
    metrics: [
      { label: "Epoch Convergence", value: "28% Faster", description: "Outperformed baseline classical CNN models" },
      { label: "Parameter Efficiency", value: "3.4x", description: "Fewer parameters via quantum Hilbert space mapping" },
      { label: "Backend", value: "AWS Braket", description: "Distributed state-vector simulation pipeline" }
    ],
    problem: "Classical deep learning models often encounter parameter bottlenecks and slow convergence when learning non-linear feature representations in complex high-dimensional datasets.",
    architecture: {
      title: "Hybrid Quantum-Classical Architecture",
      description: "Downsamples input features with a convolutional front-end before encoding them into quantum states via angle embedding for processing by variational circuits.",
      points: [
        "Classical convolutional layers extract preliminary feature maps.",
        "Angle embedding encodes features into quantum rotation gates.",
        "Parameterized variational quantum circuits apply multi-qubit entanglement via CNOT gates and Linear Combinations of Unitaries.",
        "Pauli-Z expectation measurements return outputs back to the classical loss function via parameter-shift gradients."
      ]
    },
    keyFeatures: [
      "Custom PennyLane QNode integrated with PyTorch nn.Module forward loops.",
      "Linear Combinations of Unitaries (LCU) for quantum feature mapping.",
      "Distributed training setups running on AWS Braket simulation environments.",
      "Circuit structure tuned to minimize gate depth and decoherence."
    ],
    codeSnippet: {
      language: "python",
      filename: "quantum_hybrid_layer.py",
      code: `import pennylane as qml
import torch
import torch.nn as nn

n_qubits = 4
dev = qml.device("braket.aws.qubit", wires=n_qubits, shots=1000)

@qml.qnode(dev, interface="torch", diff_method="parameter-shift")
def quantum_circuit(inputs, weights):
    for i in range(n_qubits):
        qml.RY(inputs[i], wires=i)
    qml.StronglyEntanglingLayers(weights, wires=range(n_qubits))
    return [qml.expval(qml.PauliZ(i)) for i in range(n_qubits)]

class HybridQuantumNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((2, 2)),
            nn.Flatten(),
            nn.Linear(64, n_qubits)
        )
        weight_shapes = {"weights": (3, n_qubits, 3)}
        self.qlayer = qml.qnn.TorchLayer(quantum_circuit, weight_shapes)
        self.classifier = nn.Linear(n_qubits, 10)

    def forward(self, x):
        features = self.conv(x)
        q_out = self.qlayer(features)
        return self.classifier(q_out)`
    },
    results: [
      "Achieved 28% faster convergence on classification tasks compared to pure classical networks.",
      "Verified stable gradient flow using local Pauli observable measurements.",
      "Packaged into containerized training pipelines for cloud execution."
    ],
    links: {
      github: "https://github.com/vsingh2005"
    }
  },
  {
    id: "asme-mechatronics",
    slug: "asme-mechatronics",
    title: "Autonomous Payload Drone & Off-Terrain Rover",
    subtitle: "Mechanical Prototyping, Telemetry, and CNC Components",
    category: "Embedded & Hardware",
    period: "Aug 2024 - Present",
    featured: true,
    award: "2nd Place Global (ASME IAM3D)",
    summary: "Led the electrical and prototyping subteam to design an articulated payload delivery drone and rover, taking 2nd Place Globally among 40+ international university teams in the ASME IAM3D competition.",
    role: "Electrical & Prototyping Subteam Lead",
    organization: "ASME UMass Amherst Mechatronics Team",
    technologies: ["SolidWorks", "CNC Machining", "Embedded Telemetry", "3D Printing", "Embedded C", "I2C/SPI/UART", "Motor Drivers"],
    metrics: [
      { label: "Global Standing", value: "2nd Place", description: "Outperformed 40+ international universities" },
      { label: "Payload Capacity", value: "4.5 kg", description: "Optimized lightweight structural strength" },
      { label: "Telemetry Rate", value: "50 Hz", description: "Reliable real-time sensor packet transmission" }
    ],
    problem: "Rough terrain traversal and aerial payload drops require strict weight limits, strong vibration tolerance, and robust radio telemetry under competitive time constraints.",
    architecture: {
      title: "Mechatronic Hardware & Telemetry System",
      description: "Dual ground and aerial robotics integrated with real-time feedback loops and synchronized controls.",
      points: [
        "CNC-machined aluminum 6061 frame paired with custom 3D-printed brackets.",
        "ARM Cortex microcontroller running closed-loop motor drivers.",
        "Telemetry feedback logging IMU, ultrasonic distance, and battery health via SPI/I2C buses.",
        "Precision payload latching mechanism with optical distance sensors."
      ]
    },
    keyFeatures: [
      "CNC parts modeled in SolidWorks with finite element stress analysis.",
      "Sensor telemetry protocol designed for low signal dropout in RF-heavy settings.",
      "Quick-swap battery distribution harness with over-current safety shutoffs.",
      "Design reviews conducted according to ASME IAM3D competition rules."
    ],
    results: [
      "Awarded 2nd Place Globally at the ASME IAM3D competition.",
      "Achieved 100% mission payload drop success across all competitive trials.",
      "Set team records for autonomous course traversal speed."
    ],
    links: {
      github: "https://github.com/vsingh2005"
    }
  },
  {
    id: "doe-wind-turbine",
    slug: "doe-wind-turbine",
    title: "Offshore Wind Turbine 24V Power & Telemetry System",
    subtitle: "Power Electronics, LTSpice Simulation, and Regulation",
    category: "Embedded & Hardware",
    period: "Sept 2025 - Present",
    featured: true,
    summary: "Led a 6-engineer electrical subteam in modeling, simulating, and testing a 24V power regulation and sensor telemetry circuit for the U.S. DOE Collegiate Wind Competition.",
    role: "Electrical Subteam Lead (6 Engineers)",
    organization: "U.S. Department of Energy Collegiate Wind Competition",
    technologies: ["LTSpice", "Power Electronics", "PCB Simulation", "24V Power Regulation", "Embedded C", "Sensor Telemetry"],
    metrics: [
      { label: "DOE Compliance", value: "100%", description: "Passed all electrical safety and load benchmarks" },
      { label: "Team Size", value: "6 Engineers", description: "Schematic reviews, milestones, and circuit assembly" },
      { label: "Voltage Output", value: "24V +/- 0.5%", description: "Stable output during dynamic wind-load changes" }
    ],
    problem: "Turbine generators experience unpredictable aerodynamic spikes, demanding fast-acting voltage regulation circuits that protect measurement sensors from power surges.",
    architecture: {
      title: "Power Regulation & Telemetry Setup",
      description: "Synchronous DC-DC conversion with surge clamping and isolated telemetry sensors.",
      points: [
        "Rectified 3-phase turbine power conditioned through a high-efficiency DC-DC buck-boost converter.",
        "LTSpice modeling for transient spikes and thermal dissipation under 120% overload conditions.",
        "Microcontroller telemetry tracking RPM, coil temperature, and live power generation.",
        "Opto-isolated safety disconnect relays for emergency over-voltage protection."
      ]
    },
    keyFeatures: [
      "LTSpice simulations showing zero voltage overshoot under sudden wind gusts.",
      "Optimized PCB trace layout to minimize noise and resistance.",
      "Comprehensive sensor logging for wind turbine power curve verification.",
      "100% compliance with U.S. Department of Energy safety rules."
    ],
    results: [
      "Delivered fully functional 24V power board within deadline constraints.",
      "Passed all DOE electrical safety checks on first inspection.",
      "Maintained stable telemetry during high-vibration bench testing."
    ],
    links: {
      github: "https://github.com/vsingh2005"
    }
  },
  {
    id: "umass-cloud-iac",
    slug: "umass-cloud-iac",
    title: "Multi-Tenant Cloud Infrastructure & Terraform Automation",
    subtitle: "Scalable AWS Environments, Automated Telemetry & Docker Microservices",
    category: "Cloud & Systems",
    period: "Sept 2025 - Present",
    featured: false,
    summary: "Built automated cloud infrastructure across AWS using Terraform, Docker, Python, and Bash, reducing setup turnaround by 40% and preventing configuration drift.",
    role: "Cloud Infrastructure Engineering Intern",
    organization: "University of Massachusetts Amherst IT",
    technologies: ["AWS (EC2, S3, Lambda, IAM)", "Terraform", "Docker", "Python", "Bash", "CI/CD", "Linux/Unix"],
    metrics: [
      { label: "Setup Speed", value: "40% Faster", description: "Automated Terraform modules replaced manual configuration" },
      { label: "Teams Supported", value: "6 Teams", description: "Standardized microservice deployment templates" },
      { label: "Config Drift", value: "0%", description: "IaC state locking and automated reconciliation" }
    ],
    problem: "Manual provisioning of multi-tenant cloud resources caused configuration drift, inconsistent monitoring, and slow developer onboarding.",
    architecture: {
      title: "Modular IaC & Monitoring Setup",
      description: "Standardized Terraform blueprints orchestrating containerized microservices and automated health monitors.",
      points: [
        "Modular Terraform templates for VPCs, IAM policies, S3 buckets, and auto-scaling EC2 instances.",
        "Health-check scripts in Python and Bash streaming telemetry logs into central monitoring.",
        "Dockerized microservice workflows hooked into Git CI/CD pipelines.",
        "Agile sprint planning and architecture reviews."
      ]
    },
    keyFeatures: [
      "Reusable Terraform modules adopted across 6 development teams.",
      "Automated monitoring scripts isolating platform errors early.",
      "Multi-environment promotion pipelines (Dev -> Staging -> Production).",
      "Strict IAM security controls with automated credential rotation."
    ],
    results: [
      "Reduced infrastructure setup time from days to automated 20-minute pipelines.",
      "Zero downtime during infrastructure migrations."
    ],
    links: {
      github: "https://github.com/vsingh2005"
    }
  },
  {
    id: "stem-embedded-platform",
    slug: "stem-embedded-platform",
    title: "Embedded IoT & Microcontroller Learning Platform",
    subtitle: "Hardware Lab Guides, ARM Cortex Interfacing, and Hands-on Curricula",
    category: "Embedded & Hardware",
    period: "May 2023 - Present",
    featured: false,
    summary: "Designed and taught hands-on embedded computing curricula covering microcontrollers, circuits, sensor interfacing, and robotics for 150+ students, raising project pass rates by 35%.",
    role: "Systems & Embedded Lead / Instructor",
    organization: "Stem Studio",
    technologies: ["Embedded C", "ARM Cortex", "ESP32", "Arduino", "I2C/SPI/UART", "Robotics", "Sensors"],
    metrics: [
      { label: "Students Taught", value: "150+", description: "Hands-on instruction in microcontrollers and circuits" },
      { label: "Pass Rate Increase", value: "+35%", description: "Structured hardware lab manuals and sample code" },
      { label: "Hardware Platforms", value: "4 Platforms", description: "ESP32, ARM Cortex, Arduino, and sensor breakout boards" }
    ],
    problem: "Abstract firmware and circuit topics can be difficult to grasp without structured, step-by-step hardware labs and working example code.",
    architecture: {
      title: "Step-by-Step Hardware Curriculum",
      description: "Progressive labs advancing from basic digital I/O to hardware interrupts, communication protocols (I2C/SPI/UART), and wireless IoT.",
      points: [
        "ESP32 and ARM Cortex breadboard kits with verified sensor suites.",
        "Firmware template libraries in Embedded C with clear register abstractions.",
        "Hands-on debugging with logic analyzers, oscilloscopes, and serial monitors.",
        "Open-source documentation guides and troubleshooting walkthroughs."
      ]
    },
    keyFeatures: [
      "Tested code repositories and clear circuit diagrams.",
      "Practical IoT projects connecting sensor data to cloud dashboards.",
      "Soldering and breadboard circuit verification exercises."
    ],
    results: [
      "Increased student project completion and pass rates by 35%.",
      "Trained 150+ students who have moved into collegiate engineering programs."
    ],
    links: {
      github: "https://github.com/vsingh2005"
    }
  },
  {
    id: "security-incident-response",
    slug: "security-incident-response",
    title: "Server Cloaking Malware & Backdoor Incident Remediation",
    subtitle: "Forensic Analysis, WSOD Dependency Restoration, and Linux Hardening",
    category: "Cloud & Systems",
    period: "2023 - 2024",
    featured: false,
    summary: "Led emergency incident response and security remediation for a server-side cloaking exploit and backdoor on production servers, restoring stability and preventing repeat compromises.",
    role: "Systems & Security Lead",
    organization: "Stem Studio Production Systems",
    technologies: ["Linux/Unix", "PHP", "Nginx", "Bash", "Incident Response", "Web Security", "Server Hardening"],
    metrics: [
      { label: "Downtime Recovery", value: "100%", description: "Full system restoration without loss of records" },
      { label: "Malware Removal", value: "Clean", description: "Neutralized obfuscated PHP backdoors and user-agent cloaking" },
      { label: "Security Hardening", value: "A+", description: "Implemented WAF rules, file checks, and permission locks" }
    ],
    problem: "A server exploit cloaked malicious payloads to search engine bots while displaying clean pages to admins, causing intermittent White Screen of Death (WSOD) failures.",
    architecture: {
      title: "Forensic Remediation & Server Hardening",
      description: "Diff analysis, clean rebuilds, database sanitization, and filesystem permission locks.",
      points: [
        "Isolated incoming traffic and created a clean staging environment for log investigation.",
        "Ran automated scanning scripts to identify base64 eval payloads and conditional redirect hooks.",
        "Rebuilt core server packages and sanitized database tables.",
        "Configured Nginx security headers, fail2ban rules, and strict file permissions."
      ]
    },
    keyFeatures: [
      "Automated Bash scripts for regular file integrity checking.",
      "Post-mortem documentation outlining preventative security practices.",
      "Hardened Linux kernel configurations and isolated database permissions."
    ],
    results: [
      "Restored full production uptime with zero data loss.",
      "Set up continuous monitoring alerts for unauthorized file changes."
    ],
    links: {
      github: "https://github.com/vsingh2005"
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming & Systems",
    tagline: "Core languages, hardware description, and quantum tools",
    iconName: "Code2",
    skills: [
      { name: "Python", level: "Advanced", badge: "Primary" },
      { name: "JavaScript (ES6+)", level: "Advanced", badge: "Web/Node" },
      { name: "SystemVerilog", level: "Specialized", badge: "Hardware Logic" },
      { name: "SQL", level: "Proficient", badge: "Data Modeling" },
      { name: "Java", level: "Proficient", badge: "OOP Systems" },
      { name: "Bash / Shell", level: "Advanced", badge: "Automation" },
      { name: "Qiskit", level: "Specialized", badge: "Quantum Circuits" }
    ]
  },
  {
    title: "Embedded & Hardware",
    tagline: "Firmware, microcontrollers, communication protocols, and CAD",
    iconName: "Cpu",
    skills: [
      { name: "Embedded C", level: "Advanced", badge: "Firmware" },
      { name: "ARM Cortex", level: "Proficient", badge: "Microcontrollers" },
      { name: "ESP32 / Arduino", level: "Advanced", badge: "IoT" },
      { name: "I2C / SPI / UART", level: "Advanced", badge: "Protocols" },
      { name: "LTSpice Simulation", level: "Advanced", badge: "Circuits & Power" },
      { name: "SolidWorks & CAD", level: "Proficient", badge: "3D Design" },
      { name: "CNC & 3D Prototyping", level: "Proficient", badge: "Fabrication" }
    ]
  },
  {
    title: "Cloud & Infrastructure",
    tagline: "Cloud computing, infrastructure as code, and containers",
    iconName: "Cloud",
    skills: [
      { name: "AWS EC2 / S3 / Lambda", level: "Advanced", badge: "Cloud Native" },
      { name: "AWS IAM & Security", level: "Advanced", badge: "Governance" },
      { name: "AWS Braket", level: "Specialized", badge: "Quantum Cloud" },
      { name: "Google Cloud (GCP)", level: "Proficient", badge: "Cloud Services" },
      { name: "Terraform", level: "Advanced", badge: "IaC" },
      { name: "Docker", level: "Advanced", badge: "Containers" },
      { name: "CI/CD & Git", level: "Advanced", badge: "DevOps" },
      { name: "Linux / Unix Internals", level: "Advanced", badge: "Systems" }
    ]
  },
  {
    title: "AI, ML & Analytics",
    tagline: "Machine learning, quantum algorithms, and analytics",
    iconName: "BrainCircuit",
    skills: [
      { name: "PyTorch", level: "Advanced", badge: "Deep Learning" },
      { name: "PennyLane", level: "Specialized", badge: "Quantum ML" },
      { name: "Neural Networks (CNN/QNN)", level: "Advanced", badge: "Models" },
      { name: "High-Volume Data Processing", level: "Proficient", badge: "Analytics" },
      { name: "Data Modeling", level: "Proficient", badge: "MSBA" },
      { name: "REST APIs", level: "Advanced", badge: "Backend" }
    ]
  }
];

export const TESTIMONIALS_AND_HONORS = [
  {
    quote: "Vansh led the prototyping subteam to global competition standards, helping our drone and rover place 2nd among 40+ international universities.",
    author: "ASME UMass Mechatronics Team",
    title: "IAM3D Global Competition"
  },
  {
    quote: "With reusable Terraform modules and automated monitoring scripts, Vansh reduced infrastructure setup turnaround by 40% across our engineering teams.",
    author: "Cloud Infrastructure Engineering",
    title: "UMass Amherst IT"
  },
  {
    quote: "Vansh brings together practical hardware skills and clean software engineering. His hands-on embedded curriculum significantly boosted student project success.",
    author: "Stem Studio Leadership",
    title: "Chicago, IL"
  }
];
