export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-10">
      <div className="container mx-auto px-4 text-center">
        <p>This was made by Ermias.Girma</p>
        <p>&copy; 2024 Construction Inventory. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="/" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/" className="hover:underline">
            Terms of Service
          </a>
          <a href="/" className="hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
