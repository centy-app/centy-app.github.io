using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace centy.Domain.Auth;

[CollectionName("Users")]
public class ApplicationUser : MongoIdentityUser<Guid>
{
}
