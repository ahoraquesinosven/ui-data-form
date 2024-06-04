import {useQuery, useMutation, useQueryClient} from 'react-query';
import {UserAvatar} from '@/components/UserAvatar';
import {useAccessToken} from '@/hooks/auth';
import {fetchFeedItems, assignFeedItem, unassignFeedItem, completeFeedItem, uncompleteFeedItem} from '@/api/aqsnv/feed';

function useAssignFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: string) => assignFeedItem(accessToken, feedItemId),
    onSuccess: () => {queryClient.invalidateQueries(["feed"])},
  });
}

function useUnassignFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: string) => unassignFeedItem(accessToken, feedItemId),
    onSuccess: () => {queryClient.invalidateQueries(["feed"])},
  });
}

function useCompleteFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: string) => completeFeedItem(accessToken, feedItemId),
    onSuccess: () => {queryClient.invalidateQueries(["feed"])},
  });
}

function useUncompleteFeedItemMutation() {
  const accessToken = useAccessToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (feedItemId: string) => uncompleteFeedItem(accessToken, feedItemId),
    onSuccess: () => {queryClient.invalidateQueries(["feed"])},
  });
}

function useFeedQuery(state) {
  const accessToken = useAccessToken();
  return useQuery({
    queryKey: ["feed", state],
    queryFn: () => fetchFeedItems(accessToken, state),
  });
}

export function FeedItem({item}) {
  const assignMutation = useAssignFeedItemMutation();
  const unassignMutation = useUnassignFeedItemMutation();
  const completeMutation = useCompleteFeedItemMutation();
  const uncompleteMutation = useUncompleteFeedItemMutation();

  return (
    <div className="card mb-2">
      {item.assignedUser && (
        <div className="card-header">
          <UserAvatar user={item.assignedUser} showName />
        </div>
      )}
      <div className="card-body">
        <h3 className="card-title h5">
          {item.title}
        </h3>
        <h4 className="card-subtitle h6 text-body-secondary mb-2">
          {new Intl.DateTimeFormat('es').format(new Date(item.publishedAt))} - {item.feed.name}
        </h4>
        {!item.assignedUser && (
          <a
            className="card-link btn btn-primary"
            title="Revisar"
            href={item.link}
            target='_blank'
            onClick={() => {
              assignMutation.mutate(item.id);
            }}>
            <i className='bi bi-binoculars'></i>
          </a>
        )}
        {item.assignedUser && !item.isDone && (
          <>
            <button
              className='card-link btn btn-danger'
              title="Cancelar revisión"
              onClick={() => {
                unassignMutation.mutate(item.id)
              }}>
              <i className="bi bi-x-circle-fill"></i>
            </button>
            <button
              className='card-link btn btn-success'
              title="Revisado"
              onClick={() => {
                completeMutation.mutate(item.id)
              }}>
              <i className="bi bi-check-circle-fill"></i>
            </button>
          </>
        )}
        {item.isDone && (
          <button
            className='card-link btn btn-danger'
            title='Volver a revisar'
            onClick={() => {
              uncompleteMutation.mutate(item.id)
            }}>
            <i className="bi bi-x-circle-fill"></i>
          </button>
        )}
        <a className="card-link btn btn-outline-secondary" href={item.link} target='_blank' title="Ver artículo">
          <i className='bi bi-box-arrow-up-right'></i>
        </a>
      </div>
    </div>
  )
}

export function FeedList({name, data}) {
  if (!data) {
    return;
  }

  return (
    <div className="col">
      <h2 className='h4'>
        {name} <span className="badge text-bg-danger rounded-pill">{data.total}</span>
      </h2>
      {data.page.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  )
}

export function Feed() {
  const backlogQuery = useFeedQuery("backlog");
  const inProgressQuery = useFeedQuery("inProgress");
  const doneQuery = useFeedQuery("done");

  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row row-cols-1 row-cols-md-3">
          <FeedList name="Pendientes" data={backlogQuery.data} />
          <FeedList name="En revisión" data={inProgressQuery.data} />
          <FeedList name="Revisadas" data={doneQuery.data} />
        </div>
      </div>
    </>
  );
}

