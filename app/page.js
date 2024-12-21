import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Popular from "./components/Popular";
import TopRated from "./components/TopRated";
import Trending from "./components/Trending";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <div className="container mx-auto px-4 py-8">
        <Trending />

        <Popular />

        <TopRated />
      </div>
    </>
  );
}
