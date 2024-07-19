import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const VideoItemLink = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  text-decoration: none;
  margin-top: 20px;
  padding: 30px;
  @media (max-width: 576px) {
    padding: 5px;
  }
`
export const ListItem = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  @media (max-width: 576px) {
    display: flex;
    flex-direction: column;
  }
`
export const ThumbnailImg = styled.img`
  width: 38%;
  @media (max-width: 576px) {
    width: 100%;
    height: 200px;
  }
  @media (min-width: 577px) {
    max-width: 350px;
  }
`
export const VideoDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-left: 20px;
  @media (max-width: 576px) {
    display: none;
  }
`
export const VideoDescContainerSm = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-left: 15px;
  @media (min-width: 577px) {
    display: none;
  }
`
export const ChannelLogo = styled.img`
  height: 45px;
  width: 45px;
`
export const DescContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`
export const VideoTitle = styled.p`
  font-size: 28px;
  color: ${props => (props.isDark ? '#ebebeb' : '#1e293b')};
  margin-top: 5px;
  margin-bottom: 8px;
  font-weight: 400;
  @media (max-width: 576px) {
    font-size: 18px;
  }
`
export const ChannelName = styled.p`
  font-size: 16px;
  color: ${props => (props.isDark ? '#d7dfe9' : '#64748b')};
  font-weight: 400;
  margin-top: 10px;
  margin-bottom: 8px;
  @media (max-width: 576px) {
    font-size: 14px;
  }
`
export const PublishedAndViewsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const SpanEll = styled.span`
  font-size: 42px;
  color: ${props => (props.isDark ? '#d7dfe9' : '#64748b')};
  padding-bottom: 20px;
  margin-left: 4px;
  margin-right: 4px;
`
