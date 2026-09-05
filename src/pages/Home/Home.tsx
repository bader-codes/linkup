import SuggestionsSidebar from "@/components/home/sidebar/SuggestionsSidebar";
import CreatePost from "@/components/shared/CreatePost";
import Container from "@/components/shared/Container.tsx";
import AllPosts from "@/components/posts/AllPosts";

export default function Home() {
  return (
    <>
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="hidden md:block">
            <SuggestionsSidebar />
          </aside>

          {/* Posts */}
          <main className="w-full">
            <div className="w-[95%] md:w-[85%] lg:w-[65%] mx-auto">
              <CreatePost />
            </div>

            <AllPosts />
          </main>
        </div>
      </Container>
    </>
  );
}
