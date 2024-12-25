import React, { useState } from "react";
import "./App.css"; // Assuming you move the styling to App.css

function App() {
  const [briInputs, setBriInputs] = useState({ waist: "", height: "" });
  const [absiInputs, setAbsiInputs] = useState({
    waist: "",
    weight: "",
    height: "",
  });
  const [baiInputs, setBaiInputs] = useState({ hip: "", height: "" });

  const [results, setResults] = useState({ BRI: null, ABSI: null, BAI: null });

  const calculateBRI = () => {
    const { waist, height } = briInputs;
    const heightFactor = 0.5 * height;
    const denominator = Math.pow(heightFactor, 2);
    const numerator = Math.pow(waist / (2 * Math.PI), 2);
    const innerValue = 1 - numerator / denominator;

    if (innerValue < 0) {
      setResults((prev) => ({ ...prev, BRI: NaN }));
      return;
    }

    const BRI = 364.2 - 365.5 * Math.sqrt(innerValue);
    setResults((prev) => ({ ...prev, BRI }));
  };

  const calculateABSI = () => {
    const { waist, weight, height } = absiInputs;
    const heightInMeters = height / 100;
    const BMI = weight / Math.pow(heightInMeters, 2);
    const ABSI =
      waist / (Math.pow(BMI, 2 / 3) * Math.pow(heightInMeters, 1 / 2));

    setResults((prev) => ({ ...prev, ABSI }));
  };

  const calculateBAI = () => {
    const { hip, height } = baiInputs;
    const heightInMeters = height / 100;
    const BAI = hip / Math.pow(heightInMeters, 1.5) - 18;
    setResults((prev) => ({ ...prev, BAI }));
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        Fertil ve İnfertil Kadınlarda Vücut Antropometrik Ölçümlerinin Karşılaştırılması
      </header>

      {/* Body */}
      <main className="main">
        <h2 className="main-title">Vücut Antropometrik Ölçümleri</h2>

        {/* BRI Card */}
        <div className="card">
          <h3>BRI Hesaplama</h3>
          <label>
            Bel Çevresi (cm):
            <input
              type="number"
              value={briInputs.waist}
              onChange={(e) =>
                setBriInputs({ ...briInputs, waist: e.target.value })
              }
              placeholder="Bel çevresini giriniz"
            />
          </label>
          <label>
            Boy (cm):
            <input
              type="number"
              value={briInputs.height}
              onChange={(e) =>
                setBriInputs({ ...briInputs, height: e.target.value })
              }
              placeholder="Boyunuzu giriniz"
            />
          </label>
          <button onClick={calculateBRI}>Hesapla</button>
          {results.BRI !== null && <p>Sonuç: {results.BRI.toFixed(2)}</p>}
        </div>

        {/* ABSI Card */}
        <div className="card">
          <h3>ABSI Hesaplama</h3>
          <label>
            Bel Çevresi (cm):
            <input
              type="number"
              value={absiInputs.waist}
              onChange={(e) =>
                setAbsiInputs({ ...absiInputs, waist: e.target.value })
              }
              placeholder="Bel çevresini giriniz"
            />
          </label>
          <label>
            Ağırlık (kg):
            <input
              type="number"
              value={absiInputs.weight}
              onChange={(e) =>
                setAbsiInputs({ ...absiInputs, weight: e.target.value })
              }
              placeholder="Kilonuzu giriniz"
            />
          </label>
          <label>
            Boy (cm):
            <input
              type="number"
              value={absiInputs.height}
              onChange={(e) =>
                setAbsiInputs({ ...absiInputs, height: e.target.value })
              }
              placeholder="Boyunuzu giriniz"
            />
          </label>
          <button onClick={calculateABSI}>Hesapla</button>
          {results.ABSI !== null && <p>Sonuç: {results.ABSI.toFixed(4)}</p>}
        </div>

        {/* BAI Card */}
        <div className="card">
          <h3>BAI Hesaplama</h3>
          <label>
            Kalça Çevresi (cm):
            <input
              type="number"
              value={baiInputs.hip}
              onChange={(e) =>
                setBaiInputs({ ...baiInputs, hip: e.target.value })
              }
              placeholder="Kalça çevresini giriniz"
            />
          </label>
          <label>
            Boy (cm):
            <input
              type="number"
              value={baiInputs.height}
              onChange={(e) =>
                setBaiInputs({ ...baiInputs, height: e.target.value })
              }
              placeholder="Boyunuzu giriniz"
            />
          </label>
          <button onClick={calculateBAI}>Hesapla</button>
          {results.BAI !== null && <p>Sonuç: {results.BAI.toFixed(2)}</p>}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>Dr. Gülşah Kızılgün Aksoy</span>
      </footer>
    </div>
  );
}

export default App;
