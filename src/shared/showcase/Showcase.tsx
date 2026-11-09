import AccountCard from './AccountCard';
import ActionsCard from './ActionsCard';
import NotificationsCard from './NotificationsCard';
import ProjectCard from './ProjectCard';

// A grid of real components, used on the home and Themes pages.
export default function Showcase() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6">
                <AccountCard />
                <ProjectCard />
            </div>
            <div className="flex flex-col gap-6">
                <NotificationsCard />
                <ActionsCard />
            </div>
        </div>
    );
}
