export default function ExerciseTable({ exercises }) {
  if (!exercises || exercises.length === 0) return null;

  return (
    <table className="ex-table">
      <thead>
        <tr>
          <th>Exercise</th>
          <th>Sets</th>
          <th>Reps / Time</th>
          <th style={{ textAlign: 'right' }}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((ex, idx) => (
          <tr key={idx}>
            <td>{ex.name}</td>
            <td><span className="badge">{ex.sets}</span></td>
            <td>{ex.reps}</td>
            <td className="note-text">{ex.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
