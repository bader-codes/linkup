import SuggestionsSidebar from "#components/home/Sidebar/FollowUser/SuggestedUser.tsx";
import PostCardData from "#components/shared/users/PostCardData.tsx";
import Container from "#components/shared/Container.tsx";
import Header from "#components/home/header/Header.tsx";

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <Header />
      </header>

      <Container>
        <div className="pt-20">
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
        </div>
      </Container>
    </>
  );
}
