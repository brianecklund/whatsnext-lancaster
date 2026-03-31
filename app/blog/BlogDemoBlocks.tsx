import type { BlogDemoBlock } from "@/lib/blog-demos";

export default function BlogDemoBlocks({ blocks }: { blocks: BlogDemoBlock[] }) {
  return (
    <div className="blogPostBody">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "h2":
            return (
              <h2 key={i} id={b.id} className="blogPostH2">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id} className="blogPostH3">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="blogPostP">
                {b.text}
              </p>
            );
          case "pullquote":
            return (
              <blockquote key={i} className="blogPostPullquote">
                {b.text}
              </blockquote>
            );
          case "reviewMeta":
            return (
              <div key={i} className="blogReviewMeta">
                <div className="blogReviewMeta__venue">{b.venue}</div>
                <div className="blogReviewMeta__row">
                  <span>{b.price}</span>
                  <span className="blogReviewMeta__verdict">{b.verdict}</span>
                </div>
              </div>
            );
          case "profileFacts":
            return (
              <dl key={i} className="blogProfileFacts">
                {b.items.map((item) => (
                  <div key={item.label} className="blogProfileFacts__row">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            );
          case "ul":
            return (
              <ul key={i} className="blogPostUl">
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
