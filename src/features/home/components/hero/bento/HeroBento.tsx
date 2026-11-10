import HeroBackground from '../HeroBackground';
import HeroText from '../HeroText';
import CalendarTile from './tiles/CalendarTile';
import ChatTile from './tiles/ChatTile';
import GoalTile from './tiles/GoalTile';
import NotificationsTile from './tiles/NotificationsTile';
import OtpTile from './tiles/OtpTile';
import PlayerTile from './tiles/PlayerTile';
import SignUpTile from './tiles/SignUpTile';
import SortableTableTile from './tiles/SortableTableTile';
import TeamTile from './tiles/TeamTile';
import ThemeTile from './tiles/ThemeTile';

// Each column stacks its tiles and the last one stretches, so every column
// ends on the same line and the grid has no holes. Columns are balanced by
// content height, so the stretch stays small.
const COLUMN = 'flex flex-col gap-4';
const FILL = 'flex-1';

// The landing hero: the copy above a complete grid of small live demos.
export default function HeroBento() {
    return (
        <section className="relative overflow-hidden">
            <HeroBackground />
            <div className="container mx-auto flex max-w-7xl flex-col items-center gap-14 px-4 pt-20 pb-20 md:pt-28">
                <HeroText />
                <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className={COLUMN}>
                        <CalendarTile index={0} />
                        <NotificationsTile index={4} className={FILL} />
                    </div>
                    <div className={COLUMN}>
                        <SignUpTile index={1} />
                        <GoalTile index={5} className={FILL} />
                    </div>
                    <div className={COLUMN}>
                        <ChatTile index={2} />
                        <OtpTile index={6} />
                        <ThemeTile index={8} className={FILL} />
                    </div>
                    <div className={COLUMN}>
                        <SortableTableTile index={3} />
                        <PlayerTile index={7} />
                        <TeamTile index={9} className={FILL} />
                    </div>
                </div>
            </div>
        </section>
    );
}
