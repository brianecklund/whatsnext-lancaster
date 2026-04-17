export const revalidate = 60;

export default function MockupPage() {
  return (
    <main className="mockupPage">
      <div className="mockupInner">
        <div className="mockupPhone" aria-label="Mobile site preview">
          <div className="mockupPhone__frame" aria-hidden="true">
            <div className="mockupPhone__notch" />
          </div>
          <div className="mockupPhone__viewport">
            <div className="mockupPhone__chromeTop" aria-hidden="true" />
            <iframe
              className="mockupPhone__iframe"
              title="Mobile preview"
              src="/"
              // Allow the embedded app to behave like the real site (navigation, inputs, etc.).
              sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
            />
            <div className="mockupPhone__chromeBottom" aria-hidden="true" />
          </div>
        </div>
      </div>
    </main>
  );
}

