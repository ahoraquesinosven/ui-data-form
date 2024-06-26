import {useQuery, useMutation, useQueryClient} from 'react-query';
import {UserAvatar} from '@/components/UserAvatar';
import {useAccessToken} from '@/hooks/auth';
import {FeedItem, FeedItemState, FeedItemPages, fetchFeedItems, assignFeedItem, unassignFeedItem, completeFeedItem, uncompleteFeedItem} from '@/api/aqsnv/feed';

function useAssignFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => assignFeedItem(accessToken, feedItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feed", "backlog"]);
      queryClient.invalidateQueries(["feed", "inProgress"]);
    },
  });
}

function useUnassignFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => unassignFeedItem(accessToken, feedItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feed", "backlog"]);
      queryClient.invalidateQueries(["feed", "inProgress"]);
    },
  });
}

function useCompleteFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => completeFeedItem(accessToken, feedItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feed", "inProgress"]);
      queryClient.invalidateQueries(["feed", "done"]);
    },
  });
}

function useUncompleteFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: number) => uncompleteFeedItem(accessToken, feedItemId),
    onSuccess: () => {
      queryClient.invalidateQueries(["feed", "done"]);
      queryClient.invalidateQueries(["feed", "inProgress"]);
    },
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
        if (!assignMutation.isLoading) {
          assignMutation.mutate(item.id);
        }
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
      disabled={uncompleteMutation.isLoading}
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

  const isMutating = completeMutation.isLoading || unassignMutation.isLoading;

  return (
    <>
      <button
        className='card-link btn btn-success'
        disabled={isMutating}
        onClick={() => {
          completeMutation.mutate(item.id)
        }}>
        {isMutating ? (
          <span className="spinner-border me-2"></span>
        ) : (
          <i className="bi bi-check-circle-fill me-2"></i>
        )}
        Revisado
      </button>
      <button
        className='card-link btn btn-secondary'
        disabled={completeMutation.isLoading || unassignMutation.isLoading}
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
  query: {
    isFetching: boolean,
    data: FeedItemPages,
  },
};

export function FeedList({name, query}: FeedListProps) {
  return (
    <div className="col">
      <div className="mx-1 p-2 bg-secondary-subtle rounded">
        <h2 className='h4 my-4'>
          {name} 
          { !query.isFetching && (
            <small className='ms-1'>({query.data.total})</small>
          )}
        </h2>
        { query.isFetching ? (
          <div className="text-center">
            <span className="spinner-border"></span>
          </div>
        ) : (
          query.data.page.map((item) => (
            <FeedItemCard key={item.id} item={item} />
          ))
        )}
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
          <FeedList name="Pendientes" query={backlogQuery} />
          <FeedList name="En revisión" query={inProgressQuery} />
          <FeedList name="Revisadas" query={doneQuery} />
        </div>
      </div>
    </>
  );
}

