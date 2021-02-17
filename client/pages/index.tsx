import {GetStaticProps} from "next";

import {RenderTestRow} from "../pages/dashboard/see_ab_tests"
export default function Home({ }) {
  return (
      <RenderTestRow />
  )
}




const getStaticProps : GetStaticProps = async (props) => {
  const allPostsData = ""
  return {
    props: {
    }
  }
}





