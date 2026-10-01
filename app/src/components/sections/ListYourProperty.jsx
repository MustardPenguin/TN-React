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
          <div className="upload">⬆ Upload photos and title documents</div>
          <div className="btn btn-primary btn-block">Submit for verification</div>
        </div>
      </div>
      <div className="mock-stat">
        {/* Mini version of the verification ring: five arcs, all passed. */}
        <div className="dot">
          <svg viewBox="0 0 40 40">
            <circle className="dot-ring" cx="20" cy="20" r="15" pathLength="100" strokeDasharray="17 3" strokeDashoffset="-1.5" transform="rotate(-90 20 20)" />
            <path className="dot-check" d="m14.5 20.5 3.8 3.8 7.4-8" />
          </svg>
        </div>
        <div><b>5/5 checks passed</b><span>Fully verified</span></div>
      </div>
    </div>
  );
}

export function ListYourProperty({ steps }) {
  return (
    <section>
      <div className="container owners-grid">
        <div>
          <div className="eyebrow">For sellers and builders</div>
          <h2>List a property buyers trust</h2>
          <p className="sub">Selling one home or a whole project? We verify every listing in five checks, and buyers see its progress.</p>
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
