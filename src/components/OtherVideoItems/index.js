import {formatDistanceToNow} from 'date-fns'
import {
  VideoItemLink,
  ListItem,
  ThumbnailImg,
  VideoDescContainer,
  VideoTitle,
  ChannelName,
  PublishedAndViewsContainer,
  SpanEll,
  VideoDescContainerSm,
  ChannelLogo,
  DescContainer,
} from './styledComponents'

const OtherVideoItems = props => {
  const {videoData, isDark} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = videoData
  const {name, profileImageUrl} = channel
  // const getDistance = () => {
  //   const distance = formatDistanceToNow(new Date(publishedAt))
  //   const years = distance.split(' ')[1]
  //   return years
  // }
  return (
    <VideoItemLink to={`/videos/${id}`}>
      <ListItem>
        <ThumbnailImg src={thumbnailUrl} alt="video thumbnail" />
        <VideoDescContainer>
          <VideoTitle isDark={isDark}>{title}</VideoTitle>
          <ChannelName isDark={isDark}>{name}</ChannelName>
          <PublishedAndViewsContainer>
            <ChannelName isDark={isDark}>{viewCount} views</ChannelName>
            <SpanEll isDark={isDark}>.</SpanEll>
            <ChannelName isDark={isDark}>{publishedAt}</ChannelName>
          </PublishedAndViewsContainer>
        </VideoDescContainer>
        <VideoDescContainerSm>
          <ChannelLogo src={profileImageUrl} alt="channel logo" />
          <DescContainer>
            <VideoTitle isDark={isDark}>{title}</VideoTitle>
            <PublishedAndViewsContainer>
              <ChannelName isDark={isDark}>{name}</ChannelName>
              <SpanEll isDark={isDark}>.</SpanEll>
              <ChannelName isDark={isDark}>{viewCount} views</ChannelName>
              <SpanEll isDark={isDark}>.</SpanEll>
              <ChannelName isDark={isDark}>{publishedAt}</ChannelName>
            </PublishedAndViewsContainer>
          </DescContainer>
        </VideoDescContainerSm>
      </ListItem>
    </VideoItemLink>
  )
}

export default OtherVideoItems
