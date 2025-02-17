import Story from '../models/Story.js';
import UserService from './user.js';


class Service {
  async getById(id) {
    const story = (await Story.findById(id)).toObject();
    if (!story) throw new Error('Story not found');
    story.user = await UserService.getById(story.user);
    return story;
  }
}

export default new Service();