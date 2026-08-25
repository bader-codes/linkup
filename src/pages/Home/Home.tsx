import SuggestionsSidebar from "@/components/home/sidebar/SuggestedUser.tsx";
import PostCardData from "@/components/shared/users/PostCardData.tsx";
import Container from "@/components/shared/Container.tsx";

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
              <PostCardData />
            </main>
          </div>
      </Container>
    </>
  );
}
