import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment,decrement,incrementByAmount,reset,clearHistory,setValue,selectCounterValue,selectHistory,selectLatestHistoryEntry } from './features/counterSlice'
import { selectThemeMode, toggleTheme } from './features/themeSlice'
import { useState } from 'react'
import './App.css' 

export default function App() {
  const dispatch = useDispatch()
  const value = useSelector(selectCounterValue)
  const history = useSelector(selectHistory)
  const latestHistory = useSelector(selectLatestHistoryEntry)
  const theme = useSelector(selectThemeMode)

  const [stepInput, setStepInput] = useState(5)

  const [setToInput, setSetToInput] = useState('')


  return (
    <div className={`app-root ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="card">
        <header className="card-header">
          <h1>Counter App</h1>
          <button className="btn" onClick={() => dispatch(toggleTheme())}>
            {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          </button>
        </header>
          <main className="card-body">

          <div className="counter-row">
            <button className="btn big" onClick={() => dispatch(decrement())}>
              −
            </button>

            <div className="value">{value}</div>

            <button className="btn big" onClick={() => dispatch(increment())}>
              +
            </button>
          </div>
          <div className="controls">
            <div className="group">
              <label>Custom step</label>
              <input
                type="number"
                value={stepInput}
                onChange={(e) => setStepInput(Number(e.target.value))}
              />
              <button className="btn" onClick={() => dispatch(incrementByAmount(stepInput))}>
                +{stepInput}
              </button>
              <button className="btn" onClick={() => dispatch(incrementByAmount(5))}>
                +5
              </button>
              <button className="btn" onClick={() => dispatch(incrementByAmount(10))}>
                +10
              </button>
            </div>
             <div className="group">
              <label>Set counter to</label>
              <input
                placeholder="e.g. 42"
                value={setToInput}
                onChange={(e) => setSetToInput(e.target.value)}
              />
              <button
                className="btn"
                onClick={() => {
                  dispatch(setValue(Number(setToInput) || 0))
                  setSetToInput('')
                }}
              >
                Set
              </button>
            </div>
            <div className="group actions">
              <button className="btn danger" onClick={() => dispatch(clearHistory())}>
                Clear History
              </button>
              <button className="btn" onClick={() => dispatch(reset())}>
                Reset to 0
              </button>
            </div>
          </div>
          <section className="history">
            <h2>Previous values (history)</h2>
            {history.length === 0 ? (
              <p className="muted">No history yet — change the counter to create history.</p>
            ) : (
              <ol>
                {history
                  .slice() 
                  .reverse()
                  .map((val, idx) => (
                    <li key={idx}>{val}</li>
                  ))}
              </ol>
            )}
            <div className="muted small">
              Latest history entry: {latestHistory ?? '—'}
            </div>
          </section>
        </main>

        <footer className="card-footer small muted">
          Counter value & history are saved to <code>localStorage</code> so they persist after
          refresh.
        </footer>
      </div>
     </div>
  );
}

