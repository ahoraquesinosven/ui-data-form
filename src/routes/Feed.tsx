import {useQuery, useMutation, useQueryClient} from 'react-query';
import {UserAvatar} from '@/components/UserAvatar';
import {useAccessToken} from '@/hooks/auth';
import {FeedItem, FeedItemState, FeedItemPages, fetchFeedItems, assignFeedItem, unassignFeedItem, completeFeedItem, uncompleteFeedItem} from '@/api/aqsnv/feed';

function useAssignFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => assignFeedItem(accessToken, feedItemId),
    onSuccess: () => {queryClient.invalidateQueries(["feed"])},
  });
}

function useUnassignFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => unassignFeedItem(accessToken, feedItemId),
    onSuccess: () => {queryClient.invalidateQueries(["feed"])},
  });
}

function useCompleteFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => completeFeedItem(accessToken, feedItemId),
    onSuccess: () => {queryClient.invalidateQueries(["feed"])},
  });
}

function useUncompleteFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => uncompleteFeedItem(accessToken, feedItemId),
    onSuccess: () => {queryClient.invalidateQueries(["feed"])},
  });
}

function useFeedQuery(state: FeedItemState) {
  const accessToken = useAccessToken();
  return useQuery({
    queryKey: ["feed", state],
    queryFn: () => fetchFeedItems(accessToken, state),
  });
}

type FeedItemButtonsProps = {
  item: FeedItem,
}

export function BacklogFeedItemButtons({item}: FeedItemButtonsProps) {
  const assignMutation = useAssignFeedItemMutation();

  return (
    <a
      className="card-link btn btn-primary"
      href={item.link}
      target='_blank'
      onClick={() => {
        assignMutation.mutate(item.id);
      }}>
      <i className='bi bi-binoculars me-2'></i>
      Revisar
    </a>
  );
}

export function DoneFeedItemButtons({item}: FeedItemButtonsProps) {
  const uncompleteMutation = useUncompleteFeedItemMutation();

  return (
    <button
      className='card-link btn btn-secondary'
      onClick={() => {
        uncompleteMutation.mutate(item.id)
      }}>
      <i className="bi bi-x-circle-fill me-2"></i>
      Volver a revisar
    </button>
  );
}

export function InProgressFeedItemButtons({item}: FeedItemButtonsProps) {
  const unassignMutation = useUnassignFeedItemMutation();
  const completeMutation = useCompleteFeedItemMutation();

  return (
    <>
      <button
        className='card-link btn btn-success'
        onClick={() => {
          completeMutation.mutate(item.id)
        }}>
        <i className="bi bi-check-circle-fill me-2"></i>
        Revisado
      </button>
      <button
        className='card-link btn btn-secondary'
        onClick={() => {
          unassignMutation.mutate(item.id)
        }}>
        <i className="bi bi-x-circle-fill me-2"></i>
        Pendiente
      </button>
    </>
  );
}

type FeedItemCardProps = {
  item: FeedItem,
};

export function FeedItemCard({item}: FeedItemCardProps) {
  return (
    <div className="card mb-2">
      {item.assignedUser && (
        <div className="card-header">
          <UserAvatar user={item.assignedUser} showName />
        </div>
      )}
      <div className="card-body">
        <h3 className="card-title h5 mb-3">
          {item.title}
        </h3>
        <h4 className="card-subtitle h6 text-body-secondary mb-3">
          {new Intl.DateTimeFormat('es').format(new Date(item.publishedAt))} - {item.feed.name}
        </h4>
        <div className="btn-group w-100">
          {!item.assignedUser && (
            <BacklogFeedItemButtons item={item} />
          )}
          {item.assignedUser && !item.isDone && (
            <InProgressFeedItemButtons item={item} />
          )}
          {item.isDone && (
            <DoneFeedItemButtons item={item} />
          )}
          <a className="card-link btn btn-outline-secondary" href={item.link} target='_blank' title="Ver artículo">
            <i className='bi bi-box-arrow-up-right'></i>
          </a>
        </div>
      </div>
    </div>
  );
}

type FeedListProps = {
  name: string,
  data?: FeedItemPages
};

export function FeedList({name, data}: FeedListProps) {
  if (!data) {
    return;
  }

  return (
    <div className="col">
      <div className="mx-1 p-2 bg-secondary-subtle rounded">
        <h2 className='h4 my-4'>
          {name} <small>({data.total})</small>
        </h2>
        {data.page.map((item: FeedItem) => (
          <FeedItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export function Feed() {
  const backlogQuery = useFeedQuery("backlog");
  const inProgressQuery = useFeedQuery("inProgress");
  const doneQuery = useFeedQuery("done");

  return (
    <>
      <div className="container mt-3">
        <div className="row row-cols-1 row-cols-md-3">
          <FeedList name="Pendientes" data={backlogQuery.data} />
          <FeedList name="En revisión" data={inProgressQuery.data} />
          <FeedList name="Revisadas" data={doneQuery.data} />
        </div>
      </div>
    </>
  );
}

