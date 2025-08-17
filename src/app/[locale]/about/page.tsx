import styles from './about.module.scss';
import { ABOUT_ME } from '@/constants/texts.ts';
import { useTranslations } from 'next-intl';
const AboutPage = () => {
  const t = useTranslations('AboutPage');

  return (
    <div className={styles.about}>
      <p className={styles.about__text}>
        {t('text.part1')}
        <a
          className={styles.about__link}
          target="_blank"
          href="https://rs.school/courses/reactjs"
          rel="noopener noreferrer"
        >
          {ABOUT_ME.PART_2}
        </a>
        {t('text.part2')}
      </p>
    </div>
  );
};

export default AboutPage;
