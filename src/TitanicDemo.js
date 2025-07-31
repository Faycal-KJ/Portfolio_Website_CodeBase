import React, { useState } from 'react';
import './Home.css'; // your styling

function TitanicDemo() {
  const [formData, setFormData] = useState({
    pclass: '',
    sex: '',
    age: '',
    sibsp: '',
    parch: '',
    fare: '',
    embarked: '',
    cabin: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Format features
    const features = [
      parseInt(formData.pclass),
      parseInt(formData.sex),
      parseFloat(formData.age),
      parseInt(formData.sibsp),
      parseInt(formData.parch),
      parseFloat(formData.fare),
      parseInt(formData.embarked),
      formData.cabin // assume cabin present = 1, missing = 0
    ];

    try {
      const response = await fetch('https://titanic-survival-api.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features })
      });

      const data = await response.json();
      setResult(data.prediction === 1 ? '✅ Survived' : '❌ Did Not Survive');
    } catch (error) {
      console.error('API Error:', error);
      setResult('❌ Error predicting survival.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="TitanicDemoPage">
      <h1 className="TitanicDemoTitle">Titanic Survival Prediction Demo</h1>

      <form className="TitanicForm" onSubmit={handleSubmit}>
        <div className="FormRow">
          <select name="pclass" value={formData.pclass} onChange={handleChange} className="TitanicSelect" required>
            <option value="" disabled>Select Class</option>
            <option value="1">Upper Class</option>
            <option value="2">Middle Class</option>
            <option value="3">Lower Class</option>
          </select>

          <select name="sex" value={formData.sex} onChange={handleChange} className="TitanicSelect" required>
            <option value="" disabled>Select Sex</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="sibsp"
            placeholder="Siblings/Spouses Aboard"
            value={formData.sibsp}
            onChange={handleChange}
            required
          />
        </div>

        <div className="FormRow">
          <input
            type="number"
            name="parch"
            placeholder="Parents/Children Aboard"
            value={formData.parch}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="fare"
            placeholder="Fare Paid"
            value={formData.fare}
            onChange={handleChange}
            required
          />

          <select name="embarked" value={formData.embarked} onChange={handleChange} className="TitanicSelect" required>
            <option value="" disabled>Select Embarking Place</option>
            <option value="1">Cherbourg</option>
            <option value="2">Queenstown</option>
            <option value="0">Southampton</option>
          </select>

          <input
            type="text"
            name="cabin"
            placeholder="Cabin (e.g., E53)"
            value={formData.cabin}
            onChange={handleChange}
          />
        </div>

        <button className="PredictButton" type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Survival'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '40px', fontSize: '24px', fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px #8000ff' }}>
          Result: {result}
        </div>
      )}
    </div>
  );
}

export default TitanicDemo;
