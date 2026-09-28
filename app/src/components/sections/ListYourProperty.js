import { html } from '../../lib/html.js';
import './ListYourProperty.css';

// The right-hand column is a static illustration of the listing form,
// not a real form.
function ListingFormMock() {
  return html`
    <div class="mock" aria-hidden="true">
      <div class="mock-window">
        <div class="mock-bar"><i></i><i></i><i></i></div>
        <div class="mock-body">
          <div class="mock-title">New listing</div>
          <div class="field">📍 Plot 42, Road No. 5, Manikonda, Hyderabad</div>
          <div class="field-row">
            <div class="field">4 BHK</div><div class="field">4 baths</div><div class="field">2,400 sq ft</div>
          </div>
          <div class="field-row cols-2">
            <div class="field">For sale</div><div class="field">₹1.85 Cr</div>
          </div>
          <div class="upload">⬆ Drag photos here or click to upload</div>
          <div class="btn btn-primary btn-block">Publish listing</div>
        </div>
      </div>
      <div class="mock-stat">
        <div class="dot">👀</div>
        <div><b>1,284 views</b><span>in the first week</span></div>
      </div>
    </div>`;
}

export function ListYourProperty({ steps }) {
  return html`
    <section>
      <div class="container owners-grid">
        <div>
          <div class="eyebrow">For property owners</div>
          <h2>List your property in minutes</h2>
          <p class="sub">Whether you're selling or renting, TrueNest puts your home in front of people who are actively searching.</p>
          <div class="steps">
            ${steps.map((step, i) => html`<div class="step"><div class="step-num">${i + 1}</div><div><h4>${step.title}</h4><p>${step.body}</p></div></div>`)}
          </div>
          <a href="#" class="btn btn-primary">List your property</a>
        </div>
        ${ListingFormMock()}
      </div>
    </section>`;
}
