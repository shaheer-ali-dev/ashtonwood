import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function AgreementForm() {
  const sigRef = useRef(null);

  const [form, setForm] = useState({
    clientName: "",
    date: "",
  });

  const clearSignature = () => sigRef.current.clear();

  const handleSubmit = () => {
    if (!form.clientName || !form.date || sigRef.current.isEmpty()) {
      alert("Please complete the form and sign the agreement.");
      return;
    }

    const signatureData = sigRef.current.getTrimmedCanvas().toDataURL("image/png");

    const agreementData = {
      ...form,
      signature: signatureData,
    };

    console.log("AGREEMENT SUBMITTED:", agreementData);
    alert("Agreement submitted successfully!");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>SCULPT 6-Month Coaching Agreement</h2>

      <p>
        By signing below, you agree to pay the full program fee of USD $900.00 + applicable sales tax (either upfront, or in
        monthly payments of USD $150.00 + applicable sales tax for the next five months).
      </p>

      <p><b>IMPORTANT:</b> Once the first payment is made, you are obligated to pay the remaining balance regardless of usage or participation.</p>

      <p>You give Ashton full permission to hold you accountable at all times. Failure to follow program rules may result in termination of services.</p>

      <ul>
        <li>Not following meal/workout plans</li>
        <li>Eating outside assigned schedule</li>
        <li>Not logging food intake</li>
        <li>Skipping workouts</li>
        <li>Not lifting recommended weights or reps</li>
      </ul>

      <p><b>NO REFUNDS. NO CHARGEBACKS. This is a binding agreement.</b></p>

      <p>
        This agreement is between <b>{form.clientName || "__________"}</b> and <b>SCULPT BY ASHTON</b> for a 6-month
        online coaching program.
      </p>

      <p>By signing, you acknowledge that you have read, understood, and agree to these terms in full.</p>

      <hr />

      <div style={{ marginTop: 20 }}>
        <label>Client Name</label>
        <input
          type="text"
          value={form.clientName}
          onChange={(e) => setForm({ ...form, clientName: e.target.value })}
          style={{ width: "100%", padding: 10, marginTop: 5 }}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          style={{ width: "100%", padding: 10, marginTop: 5 }}
        />
      </div>

      <div style={{ marginTop: 30 }}>
        <label>Signature</label>
        <div style={{ border: "1px solid #000", marginTop: 10 }}>
          <SignatureCanvas
            ref={sigRef}
            canvasProps={{ width: 800, height: 200, style: { background: "#f5f5f5" } }}
          />
        </div>
        <button onClick={clearSignature} style={{ marginTop: 10 }}>Clear Signature</button>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 30,
          width: "100%",
          padding: 15,
          fontSize: 16,
          background: "#111",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit Agreement
      </button>
    </div>
  );
}
