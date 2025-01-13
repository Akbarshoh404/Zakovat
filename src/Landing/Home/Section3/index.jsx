import React from "react";

import styles from "./style.module.scss";

const Section3 = () => {
  return (
    <>
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles.bigP}>RULES</div>

          <div className={styles.rules}>
            <div className={styles.card}>
              <div className={styles.number}>1</div>
              <p>
                In the game, each team tries to answer complex questions.
                Questions are on a variety of topics, and teams must use their
                quick thinking and knowledge.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>2</div>
              <p>
                A team of five main players and two reserve players from each
                class would have to be formed and would discuss the answers
                together.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>3</div>
              <p>
                There are 3 leagues in Zakovat:
                <br /> • Liga II (grades 5-6) <br />• Liga I (grades 7-8) <br />
                • Premiere League (grades 9-10-11)
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>4</div>
              <p>
                It is forbidden to break and talk loudly. For this, a fine ball
                is subtracted from your team.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>5</div>
              <p>
                Give the answer to the paper pickers on time (if more than 3
                seconds are expected, the answer will not be accepted).
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>6</div>
              <p>
                Teams arriving late from the stated time are prohibited from
                participating in the game.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>7</div>
              <p>
                Each league game has 2 rounds with different number of questions
                depending on the type of league.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.number}>8</div>
              <p>
                Players can only be changed during the 10-minute break between
                the two rounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;
