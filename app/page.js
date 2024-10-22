

import Posts from "@partials/Posts";
import {getData} from "@lib/fetchData";


export default async function Home () {
  // // const homePage = await getListPage("content/_index.md");
  // // const { frontmatter } = homePage;
  // // const { banner, feature, services, workflow, call_to_action } = frontmatter;
  // // const { title } = config.site;
  // // const posts = await getSinglePage(`content/${blog_folder}`).sort(
  // //   (post1, post2) =>
  // //     new Date(post2.frontmatter.date) - new Date(post1.frontmatter.date)
  // // );
  // // TODO Get Data
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  //
  //
  // useEffect(() => {
  //   const getContent = async () => {
  //     try {
  //       const rows = await fetchData();
  //       const formattedPosts = rows.map((row) => ({
  //         id: row[0] || null,
  //         programType: row[1] || '',
  //         programTitle: row[2] || '',
  //         programDescription: row[3] || '',
  //         programPrice: row[4] ? parseFloat(row[4]) : 0, // Corrected to row[4]
  //         programTime: row[5] || '',
  //       }));
  //       setPosts(formattedPosts);
  //     } catch (err) {
  //       console.error('Error fetching posts:', err);
  //       setError('Failed to load posts.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   getContent();
  // }, []);
  //
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  const posts = await getData();

  return (
    <>
      {/*<SeoMeta title={title} />*/}

      {/* Banner */}
      {/*<HomeBanner banner={banner} />*/}

      {/* Features */}
      {/*<HomeFeatures feature={feature} />*/}

      {/* services */}
      {/*<Services services={services} />*/}

      {/* workflow */}
      {/*<Workflow workflow={workflow} />*/}

      {/* Cta */}
      {/*<Cta cta={call_to_action} />*/}

      <section className="section">
        <div className="container">
          {/*{markdownify(title, "h1", "h1 text-center font-normal text-[56px]")}*/}
          <Posts posts={posts} />
          {/*/>*/}
        </div>
      </section>
    </>
  );
};
