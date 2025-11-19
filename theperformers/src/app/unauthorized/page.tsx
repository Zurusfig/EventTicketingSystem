export default function Unauthorized() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
}