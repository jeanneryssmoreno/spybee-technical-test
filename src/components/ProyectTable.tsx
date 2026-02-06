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
        <div className={styles.tableWrapper}>
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
                            style={{ cursor: 'pointer' }}
                        >
                            <td className={styles.cell}>
                                <div className={styles.projectTitle}>{project.title}</div>
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
                                <div className={styles.teamAvatars}>
                                
                                    {(project.users ?? []).slice(0, 3).map((user, idx) => (
                                        <span key={idx} className={styles.avatar}>
                                            {user.name?.[0] ?? ''}{user.lastName?.[0] ?? ''}
                                        </span>
                                    ))}
                                    {(project.users ?? []).length > 3 && <span>+{(project.users ?? []).length - 3}</span>}
                                </div>
                            </td>
                            <td className={styles.cell}>
                                <div className={styles.itemsGrid}>
                                    <div className={styles.itemCount}>
                                        <strong>{countItems(project.incidents, 'incident')}</strong> Incidencias
                                    </div>
                                    <div className={styles.itemCount}>
                                        <strong>{countItems(project.incidents, 'rfi')}</strong> RFI
                                    </div>
                                    <div className={styles.itemCount}>
                                        <strong>{countItems(project.incidents, 'task')}</strong> Tareas
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