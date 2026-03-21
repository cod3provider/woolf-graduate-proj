import {FaArrowRight} from "react-icons/fa";

import Container from "@components/common/Container/Container.jsx";

import cl from "./Home.module.css";

const Home = () => {
  return (
    <Container>
      <ul className={cl.contentList}>
        <li className={cl.contentItem}>
          <div className={`${cl.textContainer} ${cl.contentContainer}`}>
            <h1 className={cl.title}>
              Master <span className={cl.titleSpan}>Coding</span>
              Through Play
            </h1>

            <p className={cl.subtitle}>
              Experience a tactile and engaging way
              to learn programming. Swap blocks, snap
              logic together, and watch your code
              come to life with our friendly characters.
            </p>

            <ul className={cl.linksList}>
              <li className={cl.listItem}>
                <a href="" className={`${cl.startBtn} ${cl.btn}`}>
                  <span>Get Started</span>
                  <FaArrowRight/>
                </a>
              </li>

              <li className={cl.listItem}>
                <a href="" className={`${cl.demoBtn} ${cl.btn}`}>View Demo</a>
              </li>
            </ul>

            <div className={cl.statistic}>
              <p>Joined by 10,000+ little coders</p>
            </div>
          </div>

          <div className={`${cl.blocksWrap} ${cl.contentContainer}`}>
            <div className={cl.innerBlocksWrap}>
              <ul className={cl.listBlocks}>
                <li className={cl.itemBlock}>
                  <div className={`${cl.yellowBlock} ${cl.block}`}></div>
                </li>

                <li className={cl.itemBlock}>
                  <div className={`${cl.blueBlock} ${cl.block}`}></div>
                </li>

                <li className={cl.itemBlock}>
                  <div className={`${cl.greenBlock} ${cl.block}`}></div>
                </li>

                <li className={cl.itemBlock}>
                  <div className={`${cl.lilaBlock} ${cl.block}`}></div>
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li>
          <div className={cl.tiles}>
            <h2>Choose Your Learning Path</h2>

            <ul className={cl.listDescription}>
              <li className={cl.listDescriptionItem}>
                <div className={cl.iconBackground}></div>
                <h3>Block Coding</h3>
                <p>Drag and drop colorful snippets
                  to build your first game. Perfect
                  for beginners.</p>
              </li>

              <li className={cl.listDescriptionItem}>
                <div className={cl.iconBackground}></div>
                <h3>Web Magic</h3>
                <p>Learn the spells of HTML and CSS
                  to create beautiful websites from
                  scratch.</p>
              </li>

              <li className={cl.listDescriptionItem}>
                <div className={cl.iconBackground}></div>
                <h3>Python Pals</h3>
                <p>Talk to machines with Python.
                  Simple syntax, powerful
                  possibilities.</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </Container>
  )
}

export default Home;