// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} TokoKu. All rights reserved.</p>
      </div>
    </footer>
  );
}
