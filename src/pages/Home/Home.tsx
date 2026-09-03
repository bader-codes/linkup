import SuggestionsSidebar from "@/components/home/sidebar/SuggestedUser";
import CreatePost from "@/components/home/create-post/CreatePost";
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
            <CreatePost />
            <AllPosts />
          </main>
        </div>
      </Container>
    </>
  );
}
