import config from "@config/config.json";
import Cta from "@layouts/components/Cta";
import SeoMeta from "@layouts/SeoMeta";

import HomeBanner from "@layouts/partials/HomeBanner";
import HomeFeatures from "@layouts/partials/HomeFeatures";
import Services from "@layouts/partials/Services";
import Workflow from "@layouts/partials/Workflow";
import {getListPage, getSinglePage} from "../lib/contentParser";
import {markdownify} from "@lib/utils/textConverter";
import Posts from "@partials/Posts";

const { blog_folder } = config.settings;

const Home = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  const { banner, feature, services, workflow, call_to_action } = frontmatter;
  const { title } = config.site;

  const posts = await getSinglePage(`content/${blog_folder}`).sort(
    (post1, post2) =>
      new Date(post2.frontmatter.date) - new Date(post1.frontmatter.date)
  );
  return (
    <>
      <SeoMeta title={title} />

      {/* Banner */}
      <HomeBanner banner={banner} />

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
          {markdownify(title, "h1", "h1 text-center font-normal text-[56px]")}
          <Posts posts={posts} />
          {/*/>*/}
        </div>
      </section>
    </>
  );
};

export default Home;
