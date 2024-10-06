// "use client";
//
// import { markdownify } from "@lib/utils/textConverter";
// import MDXContent from "app/helper/MDXContent";
// import Image from "next/image";
// import SeoMeta from "./SeoMeta";
// import Link from "next/link";
// import FormModal from "@components/FormModal";
// import {useState} from "react";
// import SubmitForm from "@components/SubmitForm";
// import Modal from "@components/Modal";
// import {useState} from "react";

// const PostSingle = ({ frontmatter, content }) => {
//
//   return (
//     <>
//       <SeoMeta title={title} description={description} />
//       <section className="section">
//         <div className="container">
//           <div className="row">
//             <article className="col-12 mx-auto text-center md:col-8">
//               {image && (
//                 <Image
//                   src={image}
//                   height="500"
//                   width="1000"
//                   alt={title}
//                   priority={true}
//                   layout="responsive"
//                   className="rounded-lg"
//                 />
//               )}
//               {markdownify(title, "h1", "h2 mb-6 mt-6 text-left")}
//
//               <div className="content mb-16 text-left">
//                 <MDXContent content={content} />
//               </div>
//
//               <div className="min-h-screen flex items-center justify-center bg-gray-100">
//                 <button
//                   onClick={openModal}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Open Modal
//                 </button>
//
//                 <Modal isOpen={isModalOpen} onClose={closeModal}>
//                   <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
//                   <p className="mb-4">This is the content inside the modal.</p>
//                   <button
//                     onClick={closeModal}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//                   >
//                     Close
//                   </button>
//                 </Modal>
//               </div>
//
//             </article>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// app/page.jsx
'use client';

import {useState} from 'react';
import SeoMeta from "@layouts/SeoMeta";
import Image from "next/image";
import {markdownify} from "@lib/utils/textConverter";
import FormModal from "@components/FormModal";

const PostSingle = ({frontmatter, content}) => {
  let {description, title, image} = frontmatter;
  description = description ? description : content.slice(0, 120);
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);


  return (
    <>
      <SeoMeta title={title} description={description}/>
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="col-12 mx-auto text-center md:col-8">
              {image && (
                <Image
                  src={image}
                  height="500"
                  width="1000"
                  alt={title}
                  priority={true}
                  layout="responsive"
                  className="rounded-lg"
                />
              )}
              {markdownify(title, "h1", "h2 mb-6 mt-6 text-left")}

              <div>
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Book Now
                </button>

                <FormModal tourTitle={title} open={isModalOpen} onClose={handleCloseModal}/>
              </div>
            </article>

          </div>

        </div>

      </section>
    </>
  );
}

export default PostSingle;
