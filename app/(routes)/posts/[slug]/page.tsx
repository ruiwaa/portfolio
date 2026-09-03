export default async function PostDetailPage(props: PageProps<"/posts/[slug]">) {
  const { slug } = await props.params;

  return (
    <main className="flex-1">
      <h1 className="h1 text-light-text dark:text-dark-text">{slug}</h1>
    </main>
  );
}
