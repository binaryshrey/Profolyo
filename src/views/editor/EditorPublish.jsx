import React from 'react';
import { Loader2 } from 'lucide-react';
import { useParams, useLocation } from 'react-router-dom';
import { showToast } from '../../components/Toasts';
import { supabase } from '../../utils/Supabase';
import PageNotFound from '../not-found/PageNotFound';
import ProfileInfo from '../widgets/Profile/ProfileInfo';
import ProfileSmall from '../widgets/Profile/ProfileSmall';
import ProfileLarge from '../widgets/Profile/ProfileLarge';
import ProfileMedium from '../widgets/Profile/ProfileMedium';
import ProfileXLarge from '../widgets/Profile/ProfileXLarge';
import { Responsive, WidthProvider } from 'react-grid-layout';
import LinksInfo from '../widgets/Links/LinksInfo';
import LinksSmall from '../widgets/Links/LinksSmall';
import LinksMedium from '../widgets/Links/LinksMedium';
import LinksLarge from '../widgets/Links/LinksLarge';

const ResponsiveGridLayout = WidthProvider(Responsive);

const cols = {
  xs: 1,
  sm: 2,
  md: 4,
};
const breakpoints = {
  xs: 480,
  sm: 767,
  md: 1023,
};
const componentMap = {
  ProfileInfo,
  ProfileSmall,
  ProfileMedium,
  ProfileLarge,
  ProfileXLarge,
  LinksInfo,
  LinksSmall,
  LinksMedium,
  LinksLarge,
};

const getBreakpoint = (width) => {
  if (width <= breakpoints.xs) return 'xs';
  if (width <= breakpoints.sm) return 'sm';
  if (width <= breakpoints.md) return 'md';
  return 'md';
};
const getRowHeight = (width) => {
  if (width <= breakpoints.xs) return 160;
  if (width <= breakpoints.sm) return 160;
  if (width <= breakpoints.md) return 120;
  return 120;
};

const EditorPublish = () => {
  const { profolyoID } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [show404, setShow404] = React.useState(false);
  const [layout, setLayout] = React.useState({});
  const [mode, setMode] = React.useState(getBreakpoint(window.innerWidth));
  const [rowHeight, setRowHeight] = React.useState(getRowHeight(window.innerWidth));

  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;
  const VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME;

  React.useEffect(() => {
    const fetchProfolyoPage = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME).select().eq('UserName', profolyoID);
        if (data?.length === 0) {
          setShow404(true);
          return;
        } else {
          const res = await supabase.from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME).select().eq('UserID', data[0]?.UserID);
          setLayout(res?.data[0]?.ProfolyoLayout);
        }

        if (error) {
          throw error;
        }
      } catch (error) {
        showToast(error.message, 'error');
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfolyoPage();
  }, []);

  return (
    <>
      {loading && (
        <div className="w-full h-screen flex justify-center items-center text-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
      {!loading && show404 && <PageNotFound profolyoID={profolyoID} />}
      <div className="bg-profolyo h-screen">
        <ScrollArea className=" h-99vh">
          <div className={`bg-profolyo mx-auto w-full ${mode === 'md' ? 'max-w-6xl' : mode === 'sm' ? 'max-w-3xl' : 'max-w-sm'}`}>
            {!loading && layout[mode]?.length === 0 && <div className="flex gap-2 justify-center items-center h-80vh">No Preview Available</div>}
            {!loading && layout[mode]?.length !== 0 && (
              <ResponsiveGridLayout layouts={layout} breakpoints={breakpoints} cols={cols} rowHeight={rowHeight} width={120} isResizable={false} isDraggable={false}>
                {layout[mode]?.map((item) => {
                  const Component = componentMap[item.component];
                  return (
                    <div key={item.i}>
                      <Component clickToAdd={false} widget={item} mode={mode} viewMode={true} />
                    </div>
                  );
                })}
              </ResponsiveGridLayout>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default EditorPublish;
