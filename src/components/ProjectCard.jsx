import styles from './ProjectCard.module.scss'

import MainImageProjectCard from './MainImageProjectCard';
import StackProjectCard from './StackProjectCard';
import LanguagesProjectCard from './LanguagesProjectCard';
import FrameworksProjectCard from './FrameworksProjectCard';
import ToolsProjectCard from './ToolsProjectCard';
import ActionsProjectCard from './ActionsProjectCard';
import DatabaseProjectCard from './DatabaseProjectCard';

const ProjectCard = ({ project }) => {
  const maxLength = 150;
  const truncatedDescription = project.description.length > maxLength ?
    project.description.substring(0, maxLength) + "..." :
    project.description;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <MainImageProjectCard image={project.bannerImage} />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.description}>{truncatedDescription}</p>

          <StackProjectCard projectStack={project.stack} />
          <div className={styles.projectStack}>
            <LanguagesProjectCard frontend={project.ProjectFrontend} backend={project.ProjectBackend} />
            <FrameworksProjectCard frontend={project.ProjectFrontend} backend={project.ProjectBackend} />
            <ToolsProjectCard projectTools={project.ProjectTools} />
            <DatabaseProjectCard projectDatabase={project.ProjectDatabase} />
          </div>

          <ActionsProjectCard ProjectId={project.id} ProjectHost={project.ProjectHost} />
        </div>
      </div>
    </div >
  )
}

export default ProjectCard