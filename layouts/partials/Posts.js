import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ posts }) => {
  const { blog_folder, summary_length } = config.settings;
  for (let p in posts) {
    console.log(`${p.id}`);
    console.log(`${p.programType}`);
    console.log(`${p.programTitle}`);
    console.log(`${p.programDescription}`);
    console.log(`${p.programPrice}`);
    console.log(`${p.programTime}`);
  }
  return (
    <div className="section row pb-0">
      {posts.map((post, i) => (
        <div key={`key-${i}`} className="col-12 pb-12 lg:pb-24">
          <div className="row items-center">
            <div className="col-12 md:col-6">
              {posts[i].programType && (
                <Image
                  className="h-auto w-full rounded-lg"
                  src='/images/arrow-right.svg'
                  alt={posts[i].programTitle}
                  width={540}
                  height={227}
                  priority={true}
                />
              )}
            </div>
            <div className="col-12 md:col-6">
              <h2 className="h3 mb-2 mt-4">
                <Link
                  href={`/${blog_folder}/${posts[i].slug}`}
                  className="block hover:text-primary"
                >
                  {posts[i].programTitle}
                </Link>
              </h2>
              <p className="text-text">
                {plainify(
                  posts[i].programDescription?.slice(0, Number(summary_length)),
                  "div"
                )}
              </p>
              <Link
                className="btn btn-primary mt-4"
                href={`/${blog_folder}/${posts[i].slug}`}
                rel=""
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Posts;
