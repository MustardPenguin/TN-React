import './ListYourProperty.css';

// The right-hand column is a static illustration of the listing form,
// not a real form.
function ListingFormMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-window">
        <div className="mock-bar"><i /><i /><i /></div>
        <div className="mock-body">
          <div className="mock-title">New listing</div>
          <div className="field">📍 Plot 42, Road No. 5, Manikonda, Hyderabad</div>
          <div className="field-row">
            <div className="field">4 BHK</div><div className="field">4 baths</div><div className="field">2,400 sq ft</div>
          </div>
          <div className="field-row cols-2">
            <div className="field">For sale</div><div className="field">₹1.85 Cr</div>
          </div>
          <div className="upload">⬆ Drag photos here or click to upload</div>
          <div className="btn btn-primary btn-block">Publish listing</div>
        </div>
      </div>
      <div className="mock-stat">
        <div className="dot">👀</div>
        <div><b>1,284 views</b><span>in the first week</span></div>
      </div>
    </div>
  );
}

export function ListYourProperty({ steps }) {
  return (
    <section>
      <div className="container owners-grid">
        <div>
          <div className="eyebrow">For property owners</div>
          <h2>List your property in minutes</h2>
          <p className="sub">Whether you're selling or renting, TrueNest puts your home in front of people who are actively searching.</p>
          <div className="steps">
            {steps.map((step, i) => (
              <div key={step.title} className="step"><div className="step-num">{i + 1}</div><div><h4>{step.title}</h4><p>{step.body}</p></div></div>
            ))}
          </div>
          <a href="#" className="btn btn-primary">List your property</a>
        </div>
        <ListingFormMock />
      </div>
    </section>
  );
}
