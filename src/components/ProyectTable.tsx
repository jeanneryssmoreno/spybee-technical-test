"use client";
import { useProjectStore } from '@/store/useProjectStore';
import styles from './ProyectTable.module.css';
import { IncidentItem } from '@/types/project';

export default function ProjectTable() {
    
    const { filteredProjects, currentPage, itemsPerPage, setSelectedProject } = useProjectStore();
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentProjects = filteredProjects.slice(firstItem, lastItem);

    const countItems = (incidents: IncidentItem[] | undefined, type: string) => {
        return (incidents ?? []).filter(item => item.item?.toString().toLowerCase() === type.toLowerCase()).length;
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Proyecto</th>
                        <th>Plan</th>
                        <th>Estado</th>
                        <th>Equipo</th>
                        <th>Items por vencer</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProjects.map((project) => (
                        <tr 
                            key={project._id} 
                            className={styles.row} 
                            onClick={() => setSelectedProject(project)}
                        >
                            <td className={styles.cell}>
                                <div className={styles.projectInfo}>
                                    <div className={styles.statusLine} style={{ backgroundColor: project.status === 'active' ? '#38b2ac' : '#e53e3e' }}></div>
                                    <div className={styles.projectImagePlaceholder}></div>
                                    <div className={styles.titleContainer}>
                                        <div className={styles.projectTitle}>
                                            {project.title}
                                        </div>
                                        <div className={styles.dateRange}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            24 Nov 2023 - 24 Nov 2023
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className={styles.cell}>
                                {project.projectPlanData?.plan ? (
                                    <span className={`${styles.planBadge} ${styles['plan' + project.projectPlanData.plan]}`}>
                                        {project.projectPlanData.plan}
                                    </span>
                                ) : '-'}
                            </td>
                            <td className={styles.cell}>
                                {(() => {
                                    const statusClass = project.status ? styles[project.status] : '';
                                    return (
                                        <span className={`${styles.statusBadge} ${statusClass}`.trim()}>
                                            {project.status === 'active' ? 'Activo' : project.status}
                                        </span>
                                    );
                                })()}
                            </td>
                            <td className={styles.cell}>
                                <div className={styles.teamContainer}>
                                    {(project.users ?? []).slice(0, 5).map((user, idx) => (
                                        <div key={idx} className={styles.avatar}>
                                            {user.name?.[0] ?? ''}{user.lastName?.[0] ?? ''}
                                        </div>
                                    ))}
                                    {(project.users ?? []).length > 5 && (
                                        <div className={`${styles.avatar} ${styles.avatarExtra}`}>
                                            +{(project.users ?? []).length - 5}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td className={styles.cell}>
                                <div className={styles.itemsWrapper}>
                                    <div className={styles.itemGroup}>
                                        <span className={styles.itemNumber}>{countItems(project.incidents, 'incident')}</span>
                                        <span className={styles.itemLabel}>Incidencias</span>
                                    </div>
                                    <div className={styles.itemGroup}>
                                        <span className={styles.itemNumber}>{countItems(project.incidents, 'rfi')}</span>
                                        <span className={styles.itemLabel}>RFI</span>
                                    </div>
                                    <div className={styles.itemGroup}>
                                        <span className={styles.itemNumber}>{countItems(project.incidents, 'task')}</span>
                                        <span className={styles.itemLabel}>Tareas</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}