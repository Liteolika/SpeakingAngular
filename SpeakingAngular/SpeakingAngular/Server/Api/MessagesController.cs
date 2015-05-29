using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SpeakingAngular.Server.Api
{
    [RoutePrefix("api/messages")]
    public class MessagesController : ApiController
    {

        private List<WebMessage> messages;
        private Random rnd;

        public MessagesController()
        {
            messages = new List<WebMessage>();

            messages = new List<WebMessage>()
            {
                new WebMessage("Message 1"),
                new WebMessage("Message 2"),
                new WebMessage("Message 3"),
                new WebMessage("Message 4"),
                new WebMessage("Message 5")
            };

            rnd = new Random();

        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            messages.Clear();

            for (int i = 0; i < rnd.Next(1,3); i++)
            {
                messages.Add(new WebMessage("This is an API message"));
            }

            return Ok(messages.AsEnumerable());
        }

        [HttpPost]
        public IHttpActionResult Add(WebMessage message)
        {
            messages.Add(message);
            return Ok(message);
        }

        [HttpPut]
        public IHttpActionResult Update(WebMessage message)
        {
            return InternalServerError(new Exception("Not allowed at this time"));
        }

        [HttpDelete]
        public IHttpActionResult Delete(Guid id)
        {
            var message = messages.FirstOrDefault(x => x.Id == id);
            messages.Remove(message);
            return Ok("Deleted message id " + id.ToString());
        }


    }

    public class WebMessage
    {
        public Guid Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string Message { get; set; }

        public WebMessage()
        {
            this.Id = Guid.NewGuid();
            this.Timestamp = DateTime.Now;
        }

        public WebMessage(string message) : this()
        {
            this.Message = message;
        }

    }
}