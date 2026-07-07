import {
  User,
  Package,
  ScanSearch,
  ShieldCheck,
  FileText,
  GitBranch,
  Rocket,
  type LucideIcon,
} from "lucide-react";

interface Stage {
  title: string;
  description: string;
  icon: LucideIcon;
}

const stages: Stage[] = [
  {
    title: "Developer",
    description: "Writes Temporal workflow code",
    icon: User,
  },
  {
    title: "Maven / Gradle Plugin",
    description: "Bound to mvn verify or gradle build",
    icon: Package,
  },
  {
    title: "Workflow Scanner",
    description: "Discovers workflow classes and entry points",
    icon: ScanSearch,
  },
  {
    title: "Rule Engine",
    description: "Call-graph analysis evaluates every rule",
    icon: ShieldCheck,
  },
  {
    title: "Validation Report",
    description: "Console output and a self-contained HTML report",
    icon: FileText,
  },
  {
    title: "CI/CD",
    description: "Build fails fast on a rule violation",
    icon: GitBranch,
  },
  {
    title: "Production",
    description: "Only correctness-validated workflows ship",
    icon: Rocket,
  },
];

const NODE_WIDTH = 340;
const NODE_HEIGHT = 84;
const NODE_HEIGHT_DETAILED = 100;
const GAP = 40;
const PADDING_X = 20;
const PADDING_Y = 24;
const WRAP_CHARS = 36;

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function ArchitectureDiagram({
  detailed = false,
  className,
}: {
  detailed?: boolean;
  className?: string;
}) {
  const nodeHeight = detailed ? NODE_HEIGHT_DETAILED : NODE_HEIGHT;
  const width = NODE_WIDTH + PADDING_X * 2;
  const height =
    stages.length * nodeHeight + (stages.length - 1) * GAP + PADDING_Y * 2;

  const centerX = width / 2;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      role="img"
      aria-label="WoGu architecture: Developer, then the Maven or Gradle plugin, then the Workflow Scanner, then the Rule Engine, then the Validation Report, then CI/CD, then Production."
      className={className}
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" className="fill-border" />
        </marker>
      </defs>

      {stages.map((stage, index) => {
        const y = PADDING_Y + index * (nodeHeight + GAP);
        const x = centerX - NODE_WIDTH / 2;
        const Icon = stage.icon;
        const isLast = index === stages.length - 1;
        const descriptionLines = detailed ? wrapText(stage.description, WRAP_CHARS) : [];

        return (
          <g key={stage.title}>
            {!isLast && (
              <line
                x1={centerX}
                y1={y + nodeHeight}
                x2={centerX}
                y2={y + nodeHeight + GAP}
                className="stroke-border"
                strokeWidth={1.5}
                markerEnd="url(#arrow)"
              />
            )}

            <g transform={`translate(${x}, ${y})`}>
              <rect
                width={NODE_WIDTH}
                height={nodeHeight}
                rx={14}
                className="fill-card stroke-border"
                strokeWidth={1}
              />
              <g transform={`translate(20, ${detailed ? 18 : 22})`}>
                <rect
                  width={40}
                  height={40}
                  rx={10}
                  className="fill-brand-muted"
                />
                <g transform="translate(8, 8)">
                  <Icon width={24} height={24} className="stroke-brand" strokeWidth={1.8} />
                </g>
              </g>
              <text
                x={76}
                y={detailed ? 30 : 47}
                className="fill-foreground"
                fontSize={16}
                fontWeight={600}
              >
                {stage.title}
              </text>
              {detailed && (
                <text
                  x={76}
                  y={50}
                  className="fill-muted-foreground"
                  fontSize={12.5}
                >
                  {descriptionLines.map((line, lineIndex) => (
                    <tspan key={line} x={76} dy={lineIndex === 0 ? 0 : 16}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
