"use client";
import { useProjectStore } from '@/store/useProjectStore';
import styles from './ProyectTable.module.css';

export default function ProjectTable() {
    
    const { filteredProjects, currentPage, itemsPerPage, setSelectedProject } = useProjectStore();
    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentProjects = filteredProjects.slice(firstItem, lastItem);

    const countItems = (incidents: any[] | undefined, type: string) => {
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
                                <div className={styles.projectTitle}>{project.title}</div>
                                <span className={styles.dateRange}>Oct 12 - Nov 12</span>
                            </td>
                            <td className={styles.cell}>{project.projectPlanData?.plan ?? '-'}</td>
                            <td className={styles.cell}>
                                {(() => {
                                    const statusClass = project.status ? styles[project.status] : '';
                                    return (
                                        <span className={`${styles.statusBadge} ${statusClass}`.trim()}>
                                            {project.status ?? '-'}
                                        </span>
                                    );
                                })()}
                            </td>
                            <td className={styles.cell}>
                                <div className={styles.teamContainer}>
                                    {(project.users ?? []).slice(0, 3).map((user, idx) => (
                                        <div key={idx} className={styles.avatar}>
                                            {user.name?.[0] ?? ''}{user.lastName?.[0] ?? ''}
                                        </div>
                                    ))}
                                    {(project.users ?? []).length > 3 && (
                                        <div className={`${styles.avatar} ${styles.avatarExtra}`}>
                                            +{(project.users ?? []).length - 3}
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