import { useState } from "react";
import { Calendar } from "./components/Calendar/Calendar";
import styles from "./App.module.css";

function App() {
  // const [date, setDate] = useState<Date | string>("invalid-date-string");
  const [date, setDate] = useState(new Date());

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <div style={{ marginTop: "2rem" }}>
          <h2>Calendar Demo</h2>
          <Calendar date={date as Date} onChange={(d) => setDate(d)} />
          <p style={{ marginTop: "1rem" }}>
            Selected Date:{" "}
            {date instanceof Date && !isNaN(date.getTime())
              ? date.toDateString()
              : "Invalid Date"}
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
