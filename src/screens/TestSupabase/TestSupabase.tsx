import  { useEffect, useState } from "react";
import "./testsupabase.scss";
import { supabase } from "../../services/supabase";

export default function TestSupabase () {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("users")
          .select("id, username, email, created_at");
        if (error) throw error;
        setUsers(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return (
      <div className="testsupabase-loader">
        <div className="spinner" />
      </div>
    );

  if (error) return <p className="testsupabase-error">❌ Error: {error}</p>;

  return (
    <div className="testsupabase-container">
      <h2 className="testsupabase-title">Supabase Users Table</h2>
      {users.length === 0 ? (
        <p className="testsupabase-empty">No users found.</p>
      ) : (
        <ul className="testsupabase-list">
          {users.map((u) => (
            <li key={u.id} className="testsupabase-user">
              <strong>{u.username ?? "(no username)"}</strong> — {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
