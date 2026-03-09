import { render, screen } from "@testing-library/react";
import { FeatureCard } from "./FeatureCard";
import { Star, Camera, Upload, Heart } from "lucide-react";

const defaultProps = {
  icon: Star,
  title: "Smart Upload",
  description: "Drag & drop with automatic resizing and optimization",
  iconColor: "text-blue-600",
};

// Rendering with default props
describe("FeatureCard – Rendering", () => {
  it("renders the title text", () => {
    render(<FeatureCard {...defaultProps} />);
    expect(
      screen.getByRole("heading", { name: "Smart Upload", level: 3 })
    ).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<FeatureCard {...defaultProps} />);
    expect(
      screen.getByText(
        "Drag & drop with automatic resizing and optimization"
      )
    ).toBeInTheDocument();
  });

  it("renders the icon element", () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});

// Props & Variants – different prop combinations
describe("FeatureCard – Props & Variants", () => {
  it("renders with a different icon", () => {
    const { container } = render(
      <FeatureCard {...defaultProps} icon={Camera} />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("maps 'text-blue-600' to the 'icon-blue' class", () => {
    const { container } = render(
      <FeatureCard {...defaultProps} iconColor="text-blue-600" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("icon-blue");
  });

  it("maps 'text-green-600' to the 'icon-green' class", () => {
    const { container } = render(
      <FeatureCard {...defaultProps} iconColor="text-green-600" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("icon-green");
  });

  it("maps 'text-purple-600' to the 'icon-purple' class", () => {
    const { container } = render(
      <FeatureCard {...defaultProps} iconColor="text-purple-600" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("icon-purple");
  });

  it("maps 'text-orange-500' to the 'icon-orange' class", () => {
    const { container } = render(
      <FeatureCard {...defaultProps} iconColor="text-orange-500" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("icon-orange");
  });

  it("maps 'text-red-600' to the 'icon-red' class", () => {
    const { container } = render(
      <FeatureCard {...defaultProps} iconColor="text-red-600" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("icon-red");
  });

  it("passes through an unmapped iconColor as-is", () => {
    const { container } = render(
      <FeatureCard {...defaultProps} iconColor="text-teal-400" />
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("text-teal-400");
  });

  it("applies standard icon sizing classes to the SVG", () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("h-12", "w-12");
  });

  it("renders different title and description values", () => {
    render(
      <FeatureCard
        icon={Upload}
        title="Client Proofing"
        description="Share galleries with clients for review"
        iconColor="text-green-600"
      />
    );
    expect(
      screen.getByRole("heading", { name: "Client Proofing" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Share galleries with clients for review")
    ).toBeInTheDocument();
  });
});

// Edge cases – long strings, special characters, empty-ish values
describe("FeatureCard – Edge Cases", () => {
  it("renders an extremely long title without crashing", () => {
    const longTitle = "A".repeat(300);
    render(<FeatureCard {...defaultProps} title={longTitle} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      longTitle
    );
  });

  it("renders special characters in title and description", () => {
    render(
      <FeatureCard
        {...defaultProps}
        title="Upload <Photos> & Videos"
        description='Supports "RAW" & JPEG — 100% free!'
      />
    );
    expect(
      screen.getByText("Upload <Photos> & Videos")
    ).toBeInTheDocument();
    expect(
      screen.getByText('Supports "RAW" & JPEG — 100% free!')
    ).toBeInTheDocument();
  });

  it("renders with an empty description", () => {
    render(<FeatureCard {...defaultProps} description="" />);
    expect(
      screen.getByRole("heading", { name: "Smart Upload" })
    ).toBeInTheDocument();
  });

  it("renders with a single-character title", () => {
    render(<FeatureCard {...defaultProps} title="X" />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("X");
  });

  it("renders with unicode characters in description", () => {
    render(
      <FeatureCard {...defaultProps} description="📷 Capture moments ✨" />
    );
    expect(screen.getByText("📷 Capture moments ✨")).toBeInTheDocument();
  });
});

// Accessibility – roles, heading semantics
describe("FeatureCard – Accessibility", () => {
  it("renders the title as an h3 heading", () => {
    render(<FeatureCard {...defaultProps} />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toBeInTheDocument();
  });

  it("renders the description as a paragraph", () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const paragraph = container.querySelector("p");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent(defaultProps.description);
  });
});

// Dark mode – verify dark mode utility classes
describe("FeatureCard – Dark Mode", () => {
  it("applies dark mode class to the description", () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const paragraph = container.querySelector("p");
    expect(paragraph).toHaveClass("dark:text-slate-300");
  });
});

// Hover / transition behavior – verify CSS transition classes
describe("FeatureCard – Hover & Transitions", () => {
  it("has hover scale and transition classes on the card wrapper", () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("hover:scale-105");
    expect(card).toHaveClass("transition-transform");
    expect(card).toHaveClass("duration-300");
  });
});

// Card structure – verify the card-feature wrapper class and overall DOM structure
describe("FeatureCard – Structure", () => {
  it("wraps content in a card-feature container", () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("card-feature");
  });

  it("renders icon, heading, and paragraph as children", () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    expect(card.querySelector("svg")).toBeInTheDocument();
    expect(card.querySelector("h3")).toBeInTheDocument();
    expect(card.querySelector("p")).toBeInTheDocument();
  });

  it("centers the icon with mx-auto", () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("mx-auto");
  });

  it("renders correctly with different icon components", () => {
    const { container } = render(
      <FeatureCard {...defaultProps} icon={Heart} />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("h-12", "w-12");
  });
});
