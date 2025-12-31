import { useState } from "react";
import { Calendar } from "./components/Calendar/Calendar";
import styles from "./App.module.css";

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div style={{ marginTop: "2rem" }}>
          <h2>Calendar Demo</h2>
          <Calendar date={date} onChange={setDate} />
          <p style={{ marginTop: "1rem" }}>
            Selected Date: {date.toDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
