import styles from './About.module.scss';
import { ABOUT_ME } from '@/constants/texts.ts';

const AboutPage = () => {
  return (
    <div className={styles.about}>
      <p className={styles.about__text}>
        {ABOUT_ME.PART_1}
        <a
          className={styles.about__link}
          target="_blank"
          href="https://rs.school/courses/reactjs"
          rel="noopener noreferrer"
        >
          {ABOUT_ME.PART_2}
        </a>
        {ABOUT_ME.PART_3}
      </p>
    </div>
  );
};

export default AboutPage;
